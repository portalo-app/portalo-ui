import { createConfig, http } from 'wagmi';
import { mainnet, scrollSepolia, sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [sepolia, scrollSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [scrollSepolia.id]: http(),
  },
});
