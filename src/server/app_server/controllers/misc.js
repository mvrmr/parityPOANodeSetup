import CONST from '../../../CONSTANTS';
var util = require("util");
var exec = require("child_process").exec;

// Download dash board Data
module.exports.downLoadDashBoardData = function (req, res) {
  var filePath = req.params.fileFolder + '/' + req.params.fileSubFolder + '/' + req.params.fileName;
  res.download(filePath);
};

//Get Transcript page
module.exports.getTranscript = function (req, res) {
  res.render('getTranscript', { title: 'MCC Login', userRole: req.session.userProfile.userRoleToDisplay });
};

// This is function is NOT used currently, leaving it here for future use, if required
module.exports.promiseResetMongoDbData = function (req, res) {
  return new Promise(function (resolve, reject) {
    var cmd = "mongorestore --drop -d localDB 'data/mongoDBdump/localDB' --host " + CONST.MONGODB_SERVER_IP + ':27017';
    console.log("running command " + cmd);
    try {
      exec(cmd, function (error, stdout, stderr) {
        console.log("output" + stdout);
        console.log("err" + stderr);
      });
    } catch (err) {
      reject(err);
    }
    resolve("Database reset.");
  });
}