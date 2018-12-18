var communityfactory = artifacts.require("./communityfactory.sol");

module.exports = function(deployer) {
  deployer.deploy(communityfactory);
};
