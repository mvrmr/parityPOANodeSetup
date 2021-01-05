var labUtils = require('../../../tools/labutils');
import CONST from '../../../CONSTANTS';

var Web3 = require('web3');
var web3 = new Web3();

//var bcServer = 'http://172.18.0.2:8545'; // CONST.BLOCKCHAIN_NODE;
var bcServer = CONST.BLOCKCHAIN_NODE;

try {
    console.log("\n Inside miscApi.js, trying to connect to Ethereum blockchain @ " + bcServer + '\n');
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
    var balances = []; 
    console.log("response from BoiMccData.addEmployeeMcc Function: " + JSON.stringify(ethAccountList));
    for(var i =0;i<ethAccountList.length;i++)
      {
        var x = "Balance of Account[" + i + "], " + ethAccountList[i] + ' is ' + web3.fromWei(web3.eth.getBalance(ethAccountList[i]),"ether");
        var x = {"AccountNo":i, "Address":ethAccountList[i],"Balance(Ether)":web3.fromWei(web3.eth.getBalance(ethAccountList[i]),"ether")};
        console.log('\n ' + JSON.stringify(x) + '\n ');
        balances[i] = x;
      }
    var urlToAdminPage = CONST.API_SERVER + "/api/applicationAdministration/";
    balances[i+1] = {"LinkToAdminPage":" Click Browser Back button to go back to Application Administartion Page"};
    var balancesJson = {balances};
    labUtils.sendJsonResponse(res, 200, balancesJson);
    //labUtils.sendJsonResponse(res, 200, ethAccountList);
};

// Just a place holder <== Please adopt as needed ==>
module.exports.transferEther = function (req, res) {
    console.log("response from BoiMccData.addEmployeeMcc Function: " + web3.eth.accounts); //JSON.stringify(ethAccountList));
    var message = "Will try and Transfer Ether from " + web3.eth.accounts[0] + " to " + web3.eth.accounts[1] + " Later, Just a place holder for now";
    labUtils.sendJsonResponse(res, 200, message);
};