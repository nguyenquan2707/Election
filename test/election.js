var Election = artifacts.require('./Election.sol');

contract("Election", function(accounts) {
    let candidates;
    it('Test count', function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count.toNumber(), 3); 
        });
    });
    it('Test candidate with correct Values', function() {
        return Election.deployed().then((instance) => {
            candidates = instance;
            return candidates.candidates(1);
        }).then((candidate) => {
            assert.equal(candidate.id, 1, "Contains same id");
            assert.equal(candidate.name, "Nguyễn Việt Quân", "Contains same name");
            assert.equal(candidate.voteCount, 0, "Contains same voteCount");
            return candidates.candidates(2);
        }).then((candidate) => {
            assert.equal(candidate.id, 2, "Contain same id");
            assert.equal(candidate.name, "Nguyễn Tuấn Long", "Contains same name");
            assert.equal(candidate.voteCount, 0, "Contains same voteCount");
        });
    });

    it('Test vote function', function() {
        return Election.deployed().then((instance) => {
            candidates = instance
            return candidates.vote(1, {from: accounts[0]}); // vote function with account 0
        }).then((receipt) => { 
            /*receipt: don't do anything
            { tx:
   '0x29b7db27e8ad1c9443fb3f5af23d676704a9f8a08982906999e1f793f5636ea0',
  receipt:
   { transactionHash:
      '0x29b7db27e8ad1c9443fb3f5af23d676704a9f8a08982906999e1f793f5636ea0',
     transactionIndex: 0,
     blockHash:
      '0x4042f2c29a7a15edfca1ae2d2baebbf49704838b5f7cb95357b2013781fbfc34',
     blockNumber: 498,
     from: '0xed86d2c87a42bf3031abb85b210a9946b82e8b94',
     to: '0xdd33b16dc5592437c1ffea4a342b4d347c0e8c03',
     gasUsed: 64104,
     cumulativeGasUsed: 64104,
     contractAddress: null,
     logs: [ [Object] ],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000008000000000000000000000000000040000000000004000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000020000040000000000000004000000000000000000000000000000000000000000000000000',
     v: '0x1c',
     r:
      '0xda6c2136fa0186dff314139afe8f574d412e0d791c5c9aa0489e18907b84b772',
     s:
      '0x7f0c70cd26e384fbd072bcd7b2df99625689de85777d5701634cc8f3ce18af4',
     rawLogs: [ [Object] ] },
  logs:
   [ { logIndex: 0,
       transactionIndex: 0,
       transactionHash:
        '0x29b7db27e8ad1c9443fb3f5af23d676704a9f8a08982906999e1f793f5636ea0',
       blockHash:
        '0x4042f2c29a7a15edfca1ae2d2baebbf49704838b5f7cb95357b2013781fbfc34',
       blockNumber: 498,
       address: '0xdD33B16dC5592437C1FFEa4a342b4D347c0e8C03',
       type: 'mined',
       id: 'log_962c06da',
       event: 'votedEvent',
       args: [Result] } ] }
            */
        //test event
        assert.equal(receipt.logs.length, 1, "an event was trigger");
        assert.equal(receipt.logs[0].event, "votedEvent", "check event Name");
        assert.equal(receipt.logs[0].args._candidateId.toNumber(), 1, "check argument of event");
        assert.equal(receipt.logs[0].args._candidateId1, undefined, "no have _candidate1");
        assert.equal(receipt.logs[0].type, "mined", "check type consesus");
        assert.equal(receipt.logs[0].logIndex, 0, "logIndex");
        assert.equal(receipt.logs[0].transactionIndex, 0, "TransactionIndex");
            return candidates.voters[accounts[0]]; // add account 0 to voters map 
        }).then((voted) => {
            return candidates.candidates(1); // return candidate 1
        }).then((candidate) => {
            /* candidate:
                Result {
                        '0': <BN: 1>,
                        '1': 'Nguyễn Việt Quân',
                        '2': <BN: 1>,
                        id: <BN: 1>,
                        name: 'Nguyễn Việt Quân',
                        voteCount: <BN: 1> 
                }
            */
            let voted = candidate.voteCount;
            let name = candidate.name;
            assert.equal(name, "Nguyễn Việt Quân");
            assert.equal(voted, 1, "check candidate 1 have vote increment 1");
        }) 
    });

    it('Test exception for invalid candidate', function() {
        return Election.deployed().then((instance) => {
            candidates = instance
            return candidates.vote(99, {from: accounts[6]});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, "Error message");
            return candidates.candidates(1);
        }).then((candidate) =>{
            let vote = candidate.voteCount;
            assert.equal(vote, 1, "Candidate 1 is not receice any votes");
            return candidates.candidates(2);
        }).then((candidate) => {
            let vote = candidate.voteCount;
            assert.equal(vote, 0, "Candidate 2 is not receice any votes");
        })
    });

    it('Test exception for doublt vote', function() {
        return Election.deployed().then((instance) => {
            candidates = instance;
            return candidates.vote(2, {from: accounts[7]});
        }).then((receipt) => {
            return candidates.candidates(2);
        }).then((candidate) => {
            let vote = candidate.voteCount;
            assert.equal(vote, 1, "Candidate 2 have 1 vote");
            return candidates.vote(2, {from: accounts[7]}) // if account 7 vote for Candidate 1, then error
        }).then(assert.fail).catch((error) => {
            assert(error.message.indexOf('revert') >= 0, "Error message");
        })
    })
});
