pragma solidity ^0.5.8;

contract Election {
    //Model a candidate
    struct Candidate {
        uint id;
        string name;
        uint count;
    }
    //Store candidate
    //Fetch candidate
    //Store candidate count
    mapping(uint => Candidate) public candidates;
    //count
    uint public count;
    //Contructor
    constructor() public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        addCandidate("Candidate 3");
    }
    function addCandidate (string memory _name) private {
        count ++;
        candidates[count] = Candidate(count, _name, 0);
    }
}