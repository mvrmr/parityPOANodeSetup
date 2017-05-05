var mongoose = require('mongoose');
var Transcript = mongoose.model('Transcript');
var labUtils = require('../../../tools/labutils');

// Return Transcript records based on role of user Logged in
module.exports.getTranscriptDataFromMongoDB = function (req, res) {
    var errMsg = "";
    //console.log("req.session: " + JSON.stringify(req.session));
    var userProf = req.body.userProf;
    var queryInput = {};

    console.log("in mongoDbAPI.js: module.exports.getTranscriptDataFromMongoDB: ");
/*    console.log("userProf.userRole: " + userProf.userRole);
    console.log("userProf.lineMgrId: " + userProf.lineMgrId);
    console.log("userProf.businessUnit: " + userProf.businessUnit);*/

    switch (userProf.userRole) {
        case 'lineManager':
            queryInput = { 'lineMgrId': userProf.lineMgrId };
            break;
        case 'hrManager':
            queryInput = { 'businessUnit': userProf.businessUnit }
            break;
        default:   // roles : 'mccAdmin', 'regulator'
            break;
    }

    Transcript
        .find(queryInput)
        .exec(function (err, transcripts) {
            if (!transcripts) {
                var errMsg = "No Data Found req.body.businessUnit, req.body.lineMgrId: " + req.body.businessUnit + " , " + req.body.lineMgrId;
                labUtils.sendJsonResponse(res, 449, {
                    "outcome": errMsg,
                });
                return;
            } else if (err) {
                labUtils.sendJsonResponse(res, 449, { "outcome": err });
                return;
            }
        /*
            for (var i = 0; i < transcripts.length; i++) {
                console.log("transcripts from Mongod DB, transcripts[" + i + "]: " + transcripts[i]); //SON.stringify(transcripts));
            }
        */
            labUtils.sendJsonResponse(res, 200, {
                transcriptArray: transcripts
            });
        });
};

// Write a Transcript record to Mongo DB for caching
module.exports.writeTranscriptDataToMongoDB = function (req, res) {
    var document = req.body.document;
    console.log("\n In mongoDbAPI.js: in writeTranscriptDataToMongoDB "); // + JSON.stringify(document));
    Transcript.insertMany([document], function (err, reply) {
        //Transcript.save(documents, function(err, data) {
        if (err) {
            labUtils.sendJsonResponse(res, 400, err);
        } else {
            labUtils.sendJsonResponse(res, 200, {
                reply: reply
            });
        }
    });
}

// Remove All documents from transcripts from MongoDB
module.exports.removeTranscriptDataFromMongoDB = function (req, res) {
    console.log("\n \n In mongoDbAPI.js: in removeTranscriptDataFromMongoDB: ");
    Transcript.remove(function (err, reply) {
        if (err) {
            labUtils.sendJsonResponse(res, 400, err);
        } else {
            labUtils.sendJsonResponse(res, 200, {
                reply: reply
            });
        }
    });
}