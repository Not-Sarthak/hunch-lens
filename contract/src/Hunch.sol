// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SocialMediaNFTMarket is ERC721URIStorage, Ownable, ReentrancyGuard {
    struct Post {
        string postHash;
        string authorHandle;
        address creator;
        address curator;
        uint256 price;
        uint256 replyCount;
        uint256 recastCount;
        uint256 likeCount;
        uint256 mintTime;
        uint256 lastTradeTime;
        bool isActive;
    }

    struct Market {
        string postHash;
        uint256 totalVolume;
        uint256 totalTrades;
        address[] participants;
    }

    struct TradeHistory {
        address seller;
        address buyer;
        uint256 price;
        uint256 timestamp;
    }

    IERC20 public paymentToken;
    uint256 public constant INITIAL_PRICE = 100 * 10**18;
    uint256 public constant MAX_PRICE = 1000000 * 10**18;

    mapping(string => Post) public posts;
    mapping(string => Market) public markets;
    mapping(string => TradeHistory[]) public tradeHistories;
    mapping(string => bool) private postExists;

    event PostMinted(
        string indexed postHash,
        string authorHandle,
        uint256 price,
        uint256 timestamp
    );
    event PostTraded(
        string indexed postHash,
        address indexed seller,
        address indexed buyer,
        uint256 price,
        uint256 timestamp
    );
    event MarketUpdated(
        string indexed postHash, 
        uint256 totalVolume, 
        uint256 totalTrades
    );

    constructor(address _paymentToken) ERC721("Social Media NFT", "SMNFT") Ownable(msg.sender) {
        require(_paymentToken != address(0), "Invalid token address");
        paymentToken = IERC20(_paymentToken);
    }

    modifier ensurePostExists(string memory postHash) {
        require(postExists[postHash], "Post does not exist");
        _;
    }

    function mintPost(
        string memory postHash,
        string memory authorHandle,
        address creator,
        address curator,
        uint256 replyCount,
        uint256 recastCount,
        uint256 likeCount,
        string memory tokenURI
    ) external nonReentrant returns (string memory) {
        require(bytes(postHash).length > 0, "Post hash cannot be empty");
        require(bytes(authorHandle).length > 0, "Author handle cannot be empty");
        require(creator != address(0), "Invalid creator address");
        require(curator != address(0), "Invalid curator address");
        require(!postExists[postHash], "Post already minted");

        Post memory newPost = Post({
            postHash: postHash,
            authorHandle: authorHandle,
            creator: creator,
            curator: curator,
            price: INITIAL_PRICE,
            replyCount: replyCount,
            recastCount: recastCount,
            likeCount: likeCount,
            mintTime: block.timestamp,
            lastTradeTime: block.timestamp,
            isActive: true
        });

        posts[postHash] = newPost;
        postExists[postHash] = true;

        // Initialize market with empty participants array
        address[] memory emptyParticipants;
        markets[postHash] = Market({
            postHash: postHash,
            totalVolume: 0,
            totalTrades: 0,
            participants: emptyParticipants
        });

        _safeMint(msg.sender, uint256(keccak256(bytes(postHash))));
        _setTokenURI(uint256(keccak256(bytes(postHash))), tokenURI);

        emit PostMinted(postHash, authorHandle, INITIAL_PRICE, block.timestamp);
        return postHash;
    }

    function buyPost(string memory postHash) external nonReentrant ensurePostExists(postHash) {
        Post storage post = posts[postHash];
        require(post.isActive, "Post is not active");

        uint256 tokenId = uint256(keccak256(bytes(postHash)));
        address seller = ownerOf(tokenId);
        require(msg.sender != seller, "Cannot buy your own post");
        require(msg.sender != address(0), "Invalid buyer address");

        uint256 price = post.price;
        require(paymentToken.balanceOf(msg.sender) >= price, "Insufficient balance");
        require(paymentToken.allowance(msg.sender, address(this)) >= price, "Insufficient allowance");
        
        // Transfer payment first
        require(paymentToken.transferFrom(msg.sender, address(this), price), "Payment failed");

        // Calculate shares
        uint256 creatorShare = (price * 5) / 100; // 5% to creator
        uint256 curatorShare = (price * 2) / 100; // 2% to curator
        uint256 platformShare = (price * 1) / 100; // 1% to platform
        uint256 sellerShare = price - (creatorShare + curatorShare + platformShare);

        // Distribute rewards
        require(paymentToken.transfer(post.creator, creatorShare), "Creator reward failed");
        require(paymentToken.transfer(post.curator, curatorShare), "Curator reward failed");
        require(paymentToken.transfer(owner(), platformShare), "Platform reward failed");
        require(paymentToken.transfer(seller, sellerShare), "Seller reward failed");

        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);

        // Update price
        uint256 newPrice = (price * 110) / 100; // Increase price by 10%
        require(newPrice <= MAX_PRICE, "Price exceeds maximum");
        post.price = newPrice;
        post.lastTradeTime = block.timestamp;

        // Update market
        Market storage market = markets[postHash];
        market.totalVolume += price;
        market.totalTrades++;
        if (!_isParticipant(market.participants, msg.sender)) {
            market.participants.push(msg.sender);
        }

        // Record trade history
        tradeHistories[postHash].push(
            TradeHistory({
                seller: seller,
                buyer: msg.sender,
                price: price,
                timestamp: block.timestamp
            })
        );

        emit PostTraded(postHash, seller, msg.sender, price, block.timestamp);
        emit MarketUpdated(postHash, market.totalVolume, market.totalTrades);
    }

    function _isParticipant(address[] storage participants, address participant) private view returns (bool) {
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i] == participant) {
                return true;
            }
        }
        return false;
    }

    function getMarket(string memory postHash) external view ensurePostExists(postHash) returns (Market memory) {
        return markets[postHash];
    }

    function getPost(string memory postHash) external view ensurePostExists(postHash) returns (Post memory) {
        return posts[postHash];
    }

    function getTradeHistory(string memory postHash) external view ensurePostExists(postHash) returns (TradeHistory[] memory) {
        return tradeHistories[postHash];
    }
}