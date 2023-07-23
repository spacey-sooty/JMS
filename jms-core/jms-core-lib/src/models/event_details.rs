use crate::db::DBSingleton;

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize, schemars::JsonSchema)]
pub struct EventDetails {
  pub code: Option<String>,
  pub event_name: Option<String>,
  pub webcasts: Vec<String>,
  pub av_chroma_key: String,
  pub av_event_colour: String
}

#[async_trait::async_trait]
impl DBSingleton for EventDetails {
  const KEY: &'static str = "db:event_details";
}

impl Default for EventDetails {
  fn default() -> Self {
    Self { code: None, event_name: None, webcasts: vec![], av_chroma_key: "#f0f".to_owned(), av_event_colour: "#e9ab01".to_owned() }
  }
}