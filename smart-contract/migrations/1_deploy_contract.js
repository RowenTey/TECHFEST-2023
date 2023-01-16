const hdbToken = artifacts.require("hdbToken");

module.exports = function (deployer) {
  deployer.deploy(hdbToken);
};