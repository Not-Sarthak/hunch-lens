export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const marketFactoryAddress =
  "0xEa91a34092E5F97b144c36f4fEBf8cA108C4FE84";
export const marketFactoryAbi = [] as const;

export const backendUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8000/api";
