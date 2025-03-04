export const formatAddress = (address: string | undefined): string => {
  if (!address) return "Not Connected";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};
