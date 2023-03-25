use std::{sync::Arc, time::Duration, path::Path, fs};

use clap::{App, Arg};
use dotenv::dotenv;
use futures::{TryFutureExt, future, FutureExt};
use jms::{arena::{ArenaImpl, Arena}, config::JMSSettings, db::{self, backup::DBBackup, DBSingleton}, ds::connector::DSConnectionService, logging, tba, ui::{self, websocket::{Websockets, WebsocketMessage2UI, WebsocketMessage2JMS, resources::WSResourceHandler, matches::WSMatchHandler, event::WSEventHandler, debug::WSDebugHandler, arena::WSArenaHandler, ws::{SendMeta, RecvMeta}, tickets::WSTicketHandler}}, schedule::{worker::{MatchGenerators, MatchGenerationWorker, SharedMatchGenerators}, quals::QualsMatchGenerator, playoffs::PlayoffMatchGenerator}, models::{FTAKey, TeamRanking}, network::snmp::snmp::SNMPService, imaging::ImagingKeyService, discord, electronics::service::FieldElectronics};
use log::info;
use tokio::{sync::Mutex, try_join};

#[derive(schemars::JsonSchema)]
struct AllWebsocketMessages {
  #[allow(dead_code)]
  jms2ui: WebsocketMessage2UI,
  #[allow(dead_code)]
  ui2jms: WebsocketMessage2JMS,
  #[allow(dead_code)]
  send_meta: SendMeta,
  #[allow(dead_code)]
  recv_meta: RecvMeta
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  dotenv().ok();

  let matches = App::new("JMS")
    .about("An Alternative Field-Management-System for FRC Offseason Events.")
    .arg(Arg::with_name("debug").long("debug").short("d").help("Enable debug logging."))
    .arg(
      Arg::with_name("new-cfg")
        .long("new-cfg")
        .help("Forcefully set a new configuration"),
    )
    .arg(
      Arg::with_name("cfg-only")
        .long("cfg-only")
        .help("Only load the configuration, don't start JMS"),
    )
    .arg(
      Arg::with_name("gen-schema")
        .long("gen-schema")
        .value_name("SCHEMA_FILE")
        .takes_value(true)
        .help("Only generate the JSON schema for websocket communication")
    )
    .arg(
      Arg::with_name("no-network")
        .long("no-network")
        .help("Disable Networking"),
    )
    .arg(
      Arg::with_name("no-backup")
        .long("no-backup")
        .help("Disable Backups (not recommended)"),
    )
    .arg(
      Arg::with_name("port")
        .long("port")
        .value_name("PORT")
        .takes_value(true)
        .help("Set the primary web server port")
    )
    .get_matches();

  logging::configure(matches.is_present("debug"));

  #[cfg(tokio_unstable)]
  if matches.is_present("debug") {
    // For tokio-console
    info!("Starting console subscriber for tokio-console...");
    console_subscriber::init();
  }
  
  if let Some(v) = matches.value_of("gen-schema") {
    let file = Path::new(v);
    let schema = schemars::schema_for!(AllWebsocketMessages);
    
    fs::write(file, serde_json::to_string_pretty(&schema)?)?;
  } else if !matches.is_present("cfg-only") {

    let settings = JMSSettings::load_or_create_config(matches.is_present("new-cfg")).await?;

    db::database(); // Start connection

    FTAKey::get(&db::database())?;  // Init the FTA key if it isn't ready

    let network = match matches.is_present("no-network") {
      false => settings.network.create()?,
      true => None
    };

    let has_network = network.is_some();

    let arena = Arena::new(Arc::new(ArenaImpl::new(network)));
    
    let match_workers: SharedMatchGenerators = Arc::new(Mutex::new(MatchGenerators { 
      quals: MatchGenerationWorker::new(QualsMatchGenerator::new()), 
      playoffs: MatchGenerationWorker::new(PlayoffMatchGenerator::new()) 
    }));

    // TODO: Run arena in its own thread
    let a2 = arena.clone();
    let arena_fut = async_thread::spawn(move || {
      a2.arena_impl().run()
    }).join().map_err(|_| anyhow::anyhow!("Thread Error")).and_then(|ok| async { ok });

    let rankings_fut = TeamRanking::run();

    let ds_service = DSConnectionService::new(arena.clone()).await;
    let ds_fut = ds_service.run();

    let electronics_service = FieldElectronics::new(arena.clone(), settings.electronics);
    let elec_fut = electronics_service.run();

    let ws = Websockets::new(arena.clone()).await;
    {
      ws.register(Duration::from_millis(1000), WSResourceHandler()).await;
      ws.register(Duration::from_millis(1000), WSMatchHandler(match_workers.clone())).await;
      ws.register(Duration::from_millis(300), WSArenaHandler(arena.clone())).await;
      ws.register(Duration::from_millis(1000), WSEventHandler {}).await;
      ws.register(Duration::from_millis(2000), WSDebugHandler {}).await;
      ws.register(Duration::from_millis(5000), WSTicketHandler {}).await;
    }
    let ws_fut = ws.begin();

    let port = match matches.value_of("port") {
      Some(str) => str.parse::<u16>()?,
      None => 80,
    };
    let web_fut = ui::web::begin(port);

    let imaging_service = ImagingKeyService::new();
    let imaging_fut = imaging_service.run().map_err(|e| anyhow::anyhow!("Imaging Service Error: {}", e));

    let mut futs = vec![];
    if let Some(tba_client) = settings.tba {
      info!("TBA Enabled");
      let tba_worker = tba::TBAWorker::new(tba_client);
      futs.push(tba_worker.begin().boxed());
    }

    if let Some(discord_conf) = settings.discord {
      info!("Discord Enabled");
      let discord_bot = discord::DiscordBot::new(discord_conf);
      futs.push(discord_bot.run().boxed());
    }

    if has_network {
      let snmp_service = SNMPService::new(arena.clone());
      futs.push(snmp_service.run().boxed());
    }

    if !matches.is_present("no-backup") {
      info!("Backups Enabled");
      let backups = DBBackup::new(arena.clone(), settings.backup);
      futs.push(backups.run().boxed());
    }

    let all_futs = future::try_join_all(futs);
    try_join!(arena_fut, rankings_fut, ds_fut, elec_fut, ws_fut, web_fut, imaging_fut, all_futs)?;

    // arena_fut.join();
  }

  Ok(())
}
