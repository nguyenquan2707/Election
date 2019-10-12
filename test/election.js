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
            assert.equal(candidate.name, "Candidate 1", "Contains same name");
            assert.equal(candidate.voteCount, 0, "Contains same voteCount");
            return candidates.candidates(2);
        }).then((candidate) => {
            assert.equal(candidate.id, 2, "Contain same id");
            assert.equal(candidate.name, "Candidate 2", "Contains same name");
            assert.equal(candidate.voteCount, 0, "Contains same voteCount");
        });
    })
});
