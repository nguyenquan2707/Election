pragma solidity ^0.5.8;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (uint indexed _candidateId);

    constructor () public {
        addCandidate("Nguyễn Việt Quân");
        addCandidate("Nguyễn Tuấn Long");
        addCandidate("Nguyễn Trần Trung Khải");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]); // votes[msg.sender] = false as default

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        /*in case, the require is false, then throw exception, and gas is use only to this required, not all the vote function */

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

    //get account
    function getAccount() public view returns (address){
        return msg.sender;
    }
}