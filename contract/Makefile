RPC_URL_BNB_TESTNET := https://data-seed-prebsc-1-s1.binance.org:8545/
RPC_URL_CITREA_TESTNET := https://rpc.testnet.citrea.xyz/
RPC_URL_BASE_SEPOLIA := https://sepolia.base.org
RPC_URL_BASE_MAINNET := https://mainnet.base.org
RPC_URL_POLYGON_AMOY := https://rpc-amoy.polygon.technology/

DEPLOYER_PRIVATE_KEY := $(shell echo $$DEPLOYER_PRIVATE_KEY)
BUYER_PRIVATE_KEY := $(shell echo $$BUYER_PRIVATE_KEY)

CHAIN ?= BASE_SEPOLIA

ifeq ($(CHAIN), BNB_TESTNET)
    RPC_URL := $(RPC_URL_BNB_TESTNET)
endif

ifeq ($(CHAIN), CITREA_TESTNET)
    RPC_URL := $(RPC_URL_CITREA_TESTNET)
endif

ifeq ($(CHAIN), BASE_SEPOLIA)
    RPC_URL := $(RPC_URL_BASE_SEPOLIA)
endif

ifeq ($(CHAIN), BASE_MAINNET)
    RPC_URL := $(RPC_URL_BASE_MAINNET)
endif

ifeq ($(CHAIN), POLYGON_AMOY)
    RPC_URL := $(RPC_URL_POLYGON_AMOY)
endif

all: build

build:
	forge build

clean:
	forge clean

test:
	forge test

deploy:
	forge script script/DeployMarket.s.sol --rpc-url $(RPC_URL) --private-key $(DEPLOYER_PRIVATE_KEY) --broadcast

mint:
	forge script script/MintPost.s.sol --rpc-url $(RPC_URL) --private-key $(DEPLOYER_PRIVATE_KEY) --broadcast

buy:
	forge script script/BuyPost.s.sol --rpc-url $(RPC_URL) --private-key $(BUYER_PRIVATE_KEY) --broadcast

query:
	forge script script/QueryData.s.sol --rpc-url $(RPC_URL)

run-script:
	@echo "Usage: make run-script SCRIPT=<script_name> CHAIN=<chain_name>"
	@echo "Example: make run-script SCRIPT=MintPost.s.sol CHAIN=BASE_SEPOLIA"
	forge script script/$(SCRIPT) --rpc-url $(RPC_URL) --private-key $(DEPLOYER_PRIVATE_KEY) --broadcast

install:
	forge install

update:
	forge update

help:
	@echo "Available commands:"
	@echo "  build       - Build the project"
	@echo "  clean       - Clean the build directory"
	@echo "  test        - Run all tests"
	@echo "  deploy      - Deploy the contract to the specified chain"
	@echo "  mint        - Mint a post on the specified chain"
	@echo "  buy         - Buy a post on the specified chain"
	@echo "  query       - Query market and post data on the specified chain"
	@echo "  run-script  - Run a specific script on the specified chain"
	@echo "  install     - Install dependencies"
	@echo "  update      - Update dependencies"
	@echo ""
	@echo "Supported chains:"
	@echo "  BNB_TESTNET      - Binance Smart Chain Testnet"
	@echo "  CITREA_TESTNET   - Citrea Testnet"
	@echo "  BASE_SEPOLIA     - Base Sepolia Testnet"
	@echo "  BASE_MAINNET     - Base Mainnet"
	@echo "  POLYGON_AMOY     - Polygon Amoy"

.PHONY: all build clean test deploy mint buy query run-script install update help
