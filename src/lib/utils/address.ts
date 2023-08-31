export const formatAddress = (address: string): string =>
  `${address.substring(0, 5)}...${address.slice(-5)}`;
