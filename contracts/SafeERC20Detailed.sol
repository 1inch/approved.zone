pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


library SafeERC20Detailed {

    function safeDecimals(address token) internal returns (uint256 decimals) {

        (bool success, bytes memory data) = address(token).call(abi.encodeWithSignature("decimals()"));

        if (!success) {
            (success, data) = address(token).call(abi.encodeWithSignature("Decimals()"));
        }

        if (!success) {
            (success, data) = address(token).call(abi.encodeWithSignature("DECIMALS()"));
        }

        if (!success) {
            return 18;
        }

        assembly {
            decimals := mload(add(data, 32))
        }
    }

    function safeSymbol(address token) internal returns(bytes32 symbol) {

        (bool success, bytes memory data) = token.call(abi.encodeWithSignature("symbol()"));

        if (!success) {
            (success, data) = token.call(abi.encodeWithSignature("Symbol()"));
        }

        if (!success) {
            (success, data) = token.call(abi.encodeWithSignature("SYMBOL()"));
        }

        if (!success) {
            return 0;
        }

        uint256 dataLength = data.length;
        assembly {
            symbol := mload(add(data, dataLength))
        }
    }
}