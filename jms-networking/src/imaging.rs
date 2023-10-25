use anyhow::Result;
use jms_base::kv;
use jms_core_lib::{db::Table, models};
use jms_util::WPAKeys;
use log::{error, warn};
use tokio::{
    io::AsyncWriteExt,
    net::{TcpListener, TcpStream},
};

pub struct ImagingKeyService {}

impl ImagingKeyService {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn run(self, kv: kv::KVConnection) -> Result<()> {
        let server = TcpListener::bind(("0.0.0.0", 7171)).await?;

        loop {
            let (stream, addr) = server.accept().await?;
            warn!("Imaging Client Connected: {}", addr);
            match handle_client(stream, &kv).await {
                Err(e) => error!("Imaging Client Error: {}", e),
                Ok(()) => (),
            };
            warn!("Imaging Client Disconnected: {}", addr);
        }
    }
}

async fn handle_client(mut stream: TcpStream, kv: &kv::KVConnection) -> Result<()> {
    send_keys(&mut stream, kv).await?;
    Ok(())
}

pub async fn send_keys(stream: &mut TcpStream, kv: &kv::KVConnection) -> Result<()> {
    let keys: WPAKeys = models::Team::all(kv)?
        .iter()
        .map(|t| (t.number as u16, t.wpakey.clone()))
        .collect();

    let encoded = serde_json::to_vec(&keys)?;
    stream.write_u32(encoded.len() as u32).await?;
    stream.write_all(&encoded).await?;
    Ok(())
}
