import "@openzeppelin/contracts/access/Ownable.sol";

import "./CurveBondedToken.sol";

contract CopyCat is CurveBondedToken {
    fallback() external payable {
        mint();
    }

    event Mint(address indexed buyer, uint256 amount, uint256 timestamp);
    event Burn(address indexed seller, uint256 amount, uint256 timestamp);

    constructor(string memory name, string memory symbol, address lzEndpoint, address delegate, uint256 _reserveRatio)
        CurveBondedToken(name, symbol, reserveRatio)
    {}

    function mint() public payable {
        require(msg.value > 0, "Must send ether to buy tokens.");
        _curvedMint(msg.value);
        emit Mint(msg.sender, msg.value, block.timestamp);
    }

    function burn(uint256 _amount) public {
        uint256 returnAmount = _curvedBurn(_amount);
        (bool success,) = payable(msg.sender).call{value: returnAmount}("");
        emit Burn(msg.sender, _amount, block.timestamp);
    }
}
