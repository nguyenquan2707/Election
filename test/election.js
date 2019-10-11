var Election = artifacts.require('./Election.sol');

contract("Election", function(accounts) {
    let candidates;
    it('Test count', function() {
        return Election.deployed().then(function(instance) {
            return instance.count();
        }).then(function(count) {
            assert.equal(count.toNumber(), 3); 
        });
    });
    it('Test candidate with correct Values', function() {
        return Election.deployed().then((instance) => {
            candidates = instance;
            return candidates.candidates(1);
        }).then((candidate) => {
            assert.equal(candidate[0], 1, "Contains same id");
            assert.equal(candidate[1], "Candidate 1", "Contains same name");
            assert.equal(candidate[2], 0, "Contains same vote");
            return candidates.candidates(2);
        }).then((candidate) => {
            assert.equal(candidate[0], 2, "Contain same id");
            assert.equal(candidate[1], "Candidate 2", "Contains same name");
            assert.equal(candidate[2], 0, "Contains same vote");
        });
    })
});
