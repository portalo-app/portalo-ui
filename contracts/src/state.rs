use cosmwasm_std::Addr;
use schemars::JsonSchema;
use secret_toolkit_storage::Keymap;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct UserConfig {
    pub config: String,
    pub user: Addr,
}

pub static USER_CONFIG_STORE: Keymap<String, UserConfig> = Keymap::new(b"user_config");
pub static VIEWING_KEY: Keymap<String, String> = Keymap::new(b"user_config_viewing_key");