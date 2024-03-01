import dotenv from 'dotenv';
import * as fs from 'fs';
import { SecretNetworkClient, Wallet } from 'secretjs';
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);

const contract_wasm = fs.readFileSync('../contract.wasm.gz');

const secretjs = new SecretNetworkClient({
  chainId: 'pulsar-3',
  url: 'https://api.pulsar.scrttestnet.com',
  wallet: wallet,
  walletAddress: wallet.address,
});

let upload_contract = async () => {
  let tx = await secretjs.tx.compute
    .storeCode(
      {
        sender: wallet.address,
        wasm_byte_code: contract_wasm,
        source: '',
        builder: '',
      },
      {
        gasLimit: 4_000_000,
      }
    )
    .catch((error) => console.log(error));

  const codeId = Number(
    tx.arrayLog.find((log) => log.type === 'message' && log.key === 'code_id')
      .value
  );

  console.log('codeId: ', codeId);

  const contractCodeHash = (
    await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
  ).code_hash;
  console.log(`Contract hash: ${contractCodeHash}`);
};

// try {
//   upload_contract();
// } catch (error) {
//   console.error(error);
// }

let instantiate_contract = async () => {
  const codeId = 5183;
  const contractCodeHash =
    'b7bb4b5ed2dfdb3663f14e73b374aa96c8c7c498f9e3c9e4757d8406d6ca0af9';

  // Create an instance of the Counter contract, providing a starting count
  const initMsg = {};
  let tx = await secretjs.tx.compute.instantiateContract(
    {
      code_id: codeId,
      sender: wallet.address,
      code_hash: contractCodeHash,
      init_msg: initMsg,
      label: 'Portalo Testnet Secret Contract',
    },
    {
      gasLimit: 400_000,
    }
  );

  //Find the contract_address in the logs
  const contractAddress = tx.arrayLog.find(
    (log) => log.type === 'message' && log.key === 'contract_address'
  ).value;

  console.log(contractAddress);
};

// instantiate_contract();
const contractCodeHash =
  'b7bb4b5ed2dfdb3663f14e73b374aa96c8c7c498f9e3c9e4757d8406d6ca0af9';

const contractAddress = 'secret1fvqzspnytzjqd75t4z3fyhsmw7mh5kc4ufxaft';

let try_save_config = async () => {
  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      code_hash: contractCodeHash, // optional but way faster
      msg: {
        save_config: {
          config:
            '[ { "id": "1687705951139", "name": "juan", "password": "juan", "cryptoAddresses": [ { "address": "0x1234", "alias": "testt", "entity": { "color": "#e6007a", "icon": "dot", "value": "DOT", "label": "Polkadot", "addressRegex": {} }, "id": "1709233470451" } ], "fiatAddresses": [ { "address": "1231231", "alias": "test", "entity": { "color": "#007894", "icon": "nacion", "value": "NACION", "label": "Nacion", "addressRegex": {} }, "id": "1709233456008" } ] } ]',
          hash: 'juanprofile',
        },
      },
      sentFunds: [], // optional
    },
    {
      gasLimit: 100_000,
    }
  );
  console.log('Saving Profile...', tx);
};

// try_save_config();

let try_remove_config = async () => {
  const viewingKey = 'api_key_H2M5LUdVsvG91hj0I142VWUuyFqh67svZJ5UMdWc58E=';

  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      code_hash: contractCodeHash, // optional but way faster
      msg: {
        remove_config: {
          viewing_key: viewingKey,
        },
      },
      sentFunds: [], // optional
    },
    {
      gasLimit: 100_000,
    }
  );
  console.log('Removing Profile...', tx);
};

// try_remove_config();

let try_query_viewing_key = async () => {
  const walletAddress = 'secret1xzg5uzlj7r0aajc098t8kjqvjg4gpe7ff5h888';
  const hash = 'juanprofile';

  const my_query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractCodeHash,
    query: {
      get_viewing_key: {
        wallet: walletAddress,
        hash,
      },
    },
  });

  console.log(my_query);
};

try_query_viewing_key();

let try_query_config = async () => {
  const viewingKey = 'api_key_H2M5LUdVsvG91hj0I142VWUuyFqh67svZJ5UMdWc58E=';

  const my_query = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractCodeHash,
    query: {
      get_config: {
        viewing_key: viewingKey,
      },
    },
  });

  console.log(my_query);
};

try_query_config();
