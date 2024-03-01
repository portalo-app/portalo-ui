use cosmwasm_std::{
    entry_point, to_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult,
};
use secret_toolkit::viewing_key::{ViewingKey, ViewingKeyStore};

use crate::{
    msg::{ConfigResponse, ExecuteMsg, InstantiateMsg, QueryMsg, ViewingKeyResponse},
    state::{UserConfig, USER_CONFIG_STORE, VIEWING_KEY},
};

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    Ok(Response::default())
}

#[entry_point]
pub fn execute(deps: DepsMut, env: Env, info: MessageInfo, msg: ExecuteMsg) -> StdResult<Response> {
    match msg {
        ExecuteMsg::SaveConfig { config, hash } => try_save_config(deps, env, info, config, hash),
        ExecuteMsg::RemoveConfig { viewing_key } => try_remove_config(deps, info, viewing_key),
    }
}

pub fn try_save_config(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    config: String,
    hash: String,
) -> StdResult<Response> {
    let caller = info.sender.clone();
    let viewing_key = ViewingKey::create(deps.storage, &info, &env, &caller.as_str(), b"entropy");

    let user_config = UserConfig {
        config,
        user: caller.clone(),
    };

    USER_CONFIG_STORE.insert(deps.storage, &viewing_key, &user_config)?;
    VIEWING_KEY
        .add_suffix(caller.as_bytes())
        .insert(deps.storage, &hash, &viewing_key)?;

    Ok(Response::default())
}

pub fn try_remove_config(
    deps: DepsMut,
    info: MessageInfo,
    viewing_key: String,
) -> StdResult<Response> {
    let user_config_exists = USER_CONFIG_STORE.get(deps.storage, &viewing_key);

    match user_config_exists {
        Some(user_config) => {
            if info.sender != user_config.user {
                return Err(StdError::generic_err("Unauthorized"));
            }

            USER_CONFIG_STORE.remove(deps.storage, &viewing_key)?;

            // TODO: Remove viewing key from VIEWING_KEY
        }
        None => return Err(StdError::generic_err("No user configuration found")),
    }

    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetConfig { viewing_key } => to_binary(&query_config(deps, viewing_key)?),
        QueryMsg::GetViewingKey { wallet, hash } => {
            to_binary(&query_viewing_key(deps, wallet, hash)?)
        }
    }
}

fn query_config(deps: Deps, viewing_key: String) -> StdResult<ConfigResponse> {
    let config_exists = USER_CONFIG_STORE.get(deps.storage, &viewing_key);

    match config_exists {
        Some(config) => Ok(ConfigResponse { config }),
        None => Err(StdError::generic_err("No user configuration found")),
    }
}

fn query_viewing_key(deps: Deps, wallet: Addr, hash: String) -> StdResult<ViewingKeyResponse> {
    let viewing_key_exists = VIEWING_KEY
        .add_suffix(wallet.as_bytes())
        .get(deps.storage, &hash);

    match viewing_key_exists {
        Some(viewing_key) => Ok(ViewingKeyResponse { viewing_key }),
        None => Err(StdError::generic_err("No viewing key found")),
    }
}