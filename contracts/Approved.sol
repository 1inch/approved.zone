pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract Approved {

    function allowances(
        address source,
        IERC20[] calldata tokens,
        address[] calldata destinations
    )
        external
        view
        returns(uint256[] memory results)
    {
        require(tokens.length == destinations.length, "Invalid argument array lengths");

        results = new uint256[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {

            results[i] = tokens[i].allowance(source, destinations[i]);
        }
    }
}
