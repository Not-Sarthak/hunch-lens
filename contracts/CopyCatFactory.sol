// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";

import "./CopyCat.sol";

contract CopyCatFactory {
    event Deploy(address addr, string name, string symbol, string imageURI);

    function deploy(
        string memory name,
        string memory symbol,
        uint256 reserveRatio,
        uint256 salt,
        string calldata imageURI
    ) external returns (address) {
        bytes memory bytecode = _getBytecode(name, symbol, reserveRatio);
        address addr = Create2.deploy(0, bytes32(salt), bytecode);
        emit Deploy(addr, name, symbol, imageURI);
        return addr;
    }

    function _getBytecode(string memory name, string memory symbol, uint256 reserveRatio)
        internal
        pure
        returns (bytes memory)
    {
        bytes memory bytecode = type(CopyCat).creationCode;
        return abi.encodePacked(bytecode, abi.encode(name, symbol, reserveRatio));
    }
}
