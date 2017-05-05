var labUtils = require('../../../tools/labutils');
import CONST from '../../../CONSTANTS';

var Web3 = require('web3');
var web3 = new Web3();

var bcServer = CONST.BLOCKCHAIN_SERVER;
try {
    web3.setProvider(new web3.providers.HttpProvider(bcServer));
}
catch (error) {
    console.log("Failed to Connect to Block Chain ,error message: " + error.message);
}

///////////////////////////////////////////////////////////////////////////
// Get Account Balances
/////////////////////////////////////////////////////////////////////////// 

module.exports.getAcctBalances = function (req, res) {
    var ethAccountList = web3.eth.accounts;
    console.log("response from BoiMccData.addEmployeeMcc Function: " + JSON.stringify(ethAccountList));
    labUtils.sendJsonResponse(res, 200, ethAccountList);
};

module.exports.transferEther = function (req, res) {
    console.log("response from BoiMccData.addEmployeeMcc Function: " + web3.eth.accounts); //JSON.stringify(ethAccountList));
    var message = "Will try and Transfer Ether from " + web3.eth.accounts[0] + " to " + web3.eth.accounts[1] + " Later, Just a place holder for now";
    labUtils.sendJsonResponse(res, 200, message);
};