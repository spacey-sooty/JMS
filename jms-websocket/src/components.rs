use jms_core_lib::{db::Table, models::JmsComponent};

use crate::ws::WebsocketContext;

#[jms_websocket_macros::websocket_handler]
pub trait ComponentWebsocket {
    #[publish]
    async fn components(
        &self,
        ctx: &WebsocketContext,
    ) -> anyhow::Result<(chrono::DateTime<chrono::Local>, Vec<JmsComponent>)> {
        Ok((chrono::Local::now(), JmsComponent::all(&ctx.kv)?))
    }
}
