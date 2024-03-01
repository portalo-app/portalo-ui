import { SecretNetworkClient, Wallet } from 'secretjs';

// This should be a sign by wallet user
const wallet = new Wallet(
  'blossom copy head can penalty true argue able entire shiver razor return'
);

const contractCodeHash =
  'b7bb4b5ed2dfdb3663f14e73b374aa96c8c7c498f9e3c9e4757d8406d6ca0af9';
const contractAddress = 'secret1fvqzspnytzjqd75t4z3fyhsmw7mh5kc4ufxaft';

const secretjs = new SecretNetworkClient({
  chainId: 'pulsar-3',
  url: 'https://api.pulsar.scrttestnet.com',
  wallet: wallet,
  walletAddress: wallet.address,
});

const useSecretContract = () => {
  //this fn should receive config and hash from params
  const postConfig = async () => {
    const tx = await secretjs.tx.compute.executeContract(
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
      },
      {
        gasLimit: 100_000,
      }
    );
    console.log('Saving Profile...', tx);
  };

  const deleteConfig = async (viewingKey: string) => {
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: wallet.address,
        contract_address: contractAddress,
        code_hash: contractCodeHash, // optional but way faster
        msg: {
          remove_config: {
            viewing_key: viewingKey,
          },
        },
      },
      {
        gasLimit: 100_000,
      }
    );
    console.log('Removing Profile...', tx);
  };

  const getDataByViewingKey = async (viewingKey: string) => {
    const result = (await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: contractCodeHash,
      query: {
        get_config: {
          viewing_key: viewingKey,
        },
      },
    })) as { config: { config: string } };

    const parsedResult = JSON.parse(result.config.config)[0];
    return parsedResult;
  };

  const getConfig = async (viewingKey: string) => {
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

  return { postConfig, deleteConfig, getDataByViewingKey, getConfig };
};

export default useSecretContract;
