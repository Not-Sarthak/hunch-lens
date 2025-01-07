export const LENS_CHAIN_ID = 84532;
export const marketFactoryAddress =
  "0x9731eC4D4989ea4792527E523Da6D67E58223a78";
export const tokenContractAddress = "";

export const backendUrl =
  process.env.NODE_ENV === "production"
    ? ""
    : "https://hunch-1.onrender.com/api";

export const marketFactoryAbi = [
  {
    inputs: [],
    name: "Create2EmptyBytecode",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedDeployment",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
    ],
    name: "Deploy",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reserveRatio",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        internalType: "string",
        name: "postId",
        type: "string",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedTokensByAddress",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        internalType: "string",
        name: "postId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLaunchedTokens",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "text",
            type: "string",
          },
          {
            internalType: "string",
            name: "postId",
            type: "string",
          },
        ],
        internalType: "struct CopyCatFactory.TokenInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "deployer",
        type: "address",
      },
    ],
    name: "getTokensByDeployer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "text",
            type: "string",
          },
          {
            internalType: "string",
            name: "postId",
            type: "string",
          },
        ],
        internalType: "struct CopyCatFactory.TokenInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "launchedTokens",
    outputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageURI",
        type: "string",
      },
      {
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        internalType: "string",
        name: "postId",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
