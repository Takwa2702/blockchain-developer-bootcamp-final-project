const MusicContract = artifacts.require("MusicContract");

module.exports = function(deployer) {
  deployer.deploy(MusicContract);
}