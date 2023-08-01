use std::num::ParseIntError;

use crate::db;

#[derive(jms_macros::Updateable)]
#[derive(Debug, Clone, PartialEq, Eq, serde::Serialize, serde::Deserialize, schemars::JsonSchema)]
pub struct Team {
  pub number: usize,
  pub display_number: String,
  pub name: Option<String>,
  pub affiliation: Option<String>,
  pub location: Option<String>,
  pub notes: Option<String>,
  pub wpakey: Option<String>,
  pub schedule: bool,
}

#[async_trait::async_trait]
impl db::Table for Team {
  const PREFIX: &'static str = "db:team";
  type Id = usize;
  type Err = ParseIntError;

  fn id(&self) -> Self::Id {
    self.number
  }
}

impl Team {
  pub fn maybe_gen_wpa(mut self) -> Team {
    if self.wpakey.is_some() {
      return self
    } else {
      use rand::distributions::Alphanumeric;
      use rand::{thread_rng, Rng};
      
      self.wpakey = Some(
        thread_rng()
          .sample_iter(&Alphanumeric)
          .take(30)
          .map(char::from)
          .collect()
      );
      return self
    }
  }
}
