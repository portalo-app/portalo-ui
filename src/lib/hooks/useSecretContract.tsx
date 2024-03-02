import { useChain } from '@cosmos-kit/react';
import { Profile } from '@models/profile';
import { SecretNetworkClient } from 'secretjs';

// // This should be a sign by wallet user
// const wallet = new Wallet(
//   'blossom copy head can penalty true argue able entire shiver razor return'
// );

const contractCodeHash =
  'b7bb4b5ed2dfdb3663f14e73b374aa96c8c7c498f9e3c9e4757d8406d6ca0af9';
const contractAddress = 'secret1fvqzspnytzjqd75t4z3fyhsmw7mh5kc4ufxaft';

const useSecretContract = () => {
  const { address } = useChain('secretnetworktestnet');

  const typedWindow =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window as Window & typeof globalThis & { leap: any };

  //this fn should receive config and hash from params
  const postConfig = async (profile: Profile) => {
    if (!address) return;

    if (!typedWindow || !typedWindow.leap) return;

    const leapOfflineSigner =
      typedWindow.leap.getOfflineSignerOnlyAmino('pulsar-3');

    const secretjs = new SecretNetworkClient({
      chainId: 'pulsar-3',
      url: 'https://api.pulsar.scrttestnet.com',
      wallet: leapOfflineSigner,
      walletAddress: address,
    });
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: address,
        contract_address: contractAddress,
        code_hash: contractCodeHash, // optional but way faster
        msg: {
          save_config: {
            config: JSON.stringify(profile),
            hash: profile.name,
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
    if (!address) return;

    if (!typedWindow || !typedWindow.leap) return;

    const leapOfflineSigner =
      typedWindow.leap.getOfflineSignerOnlyAmino('pulsar-3');

    const secretjs = new SecretNetworkClient({
      chainId: 'pulsar-3',
      url: 'https://api.pulsar.scrttestnet.com',
      wallet: leapOfflineSigner,
      walletAddress: address,
    });
    const tx = await secretjs.tx.compute.executeContract(
      {
        sender: address,
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
    const secretjs = new SecretNetworkClient({
      chainId: 'pulsar-3',
      url: 'https://api.pulsar.scrttestnet.com',
    });
    const result = (await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: contractCodeHash,
      query: {
        get_config: {
          viewing_key: viewingKey,
        },
      },
    })) as { config: { config: string } };

    if (!result || !result.config) return null;

    const parsedResult = JSON.parse(result.config.config);
    return parsedResult;
  };

  const getViewingKey = async (walletAddress: string, hash: string) => {
    if (!address) return;

    const secretjs = new SecretNetworkClient({
      chainId: 'pulsar-3',
      url: 'https://api.pulsar.scrttestnet.com',
    });

    const result = (await secretjs.query.compute.queryContract({
      contract_address: contractAddress,
      code_hash: contractCodeHash,
      query: {
        get_viewing_key: {
          wallet: walletAddress,
          hash,
        },
      },
    })) as { viewing_key: string };

    return result?.viewing_key || '';
  };

  return { postConfig, deleteConfig, getDataByViewingKey, getViewingKey };
};

export default useSecretContract;
