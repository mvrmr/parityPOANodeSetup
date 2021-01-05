
var StringUtils = artifacts.require("./StringUtils.sol");
var BoiMccData = artifacts.require("./BoiMccData.sol");

module.exports = function(deployer) {  
  deployer.deploy(StringUtils);
  
  deployer.link(StringUtils, BoiMccData);
  deployer.deploy(BoiMccData);
};
