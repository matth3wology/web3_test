// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Hello {
    string public greeting;
    
    constructor() {
        greeting = "Hello World!";
    }

    function setItem(string memory _greeting) public {
        greeting = _greeting;
    }

    function getItem() public view returns (string memory) {
        return greeting;
    }
}