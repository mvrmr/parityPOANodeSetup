import CONST from '../../../CONSTANTS';
//import utils from '../../utils';
var mongoose = require('mongoose');
var UsrProfile = mongoose.model('UserProfile');

var labUtils = require('../../../tools/labutils');

//var i = 0;  // Loop variable

// Verify the login form password with database and send back response
module.exports.verifyUserLoginAPI = function (req, res) {
    var errMsg = "";
    //console.log("in UserProfileAPI.js: module.exports.verifyUserLogin ID/pwd: " + req.body.userId + ' / ' + req.body.password);
    if (req.body && req.body.userId && req.body.password) {

        UsrProfile
            .findOne({ 'userId': req.body.userId })
            .select('firstName lastName roles password passwordHash userId businessUnit lineMgrId')
            .exec(function (err, userProf) {
                if (!userProf) {
                    var errMsg = "user profile not found for userId: " + req.body.userId;
                    labUtils.sendJsonResponse(res, 449, {
                        "outcome": errMsg,
                    });
                    return;
                } else if (err) {
                    labUtils.sendJsonResponse(res, 449, { "outcome": err });
                    return;
                }
                //console.log("in UserProfileAPI.js: module.exports.verifyUserLogin ID/pwd: " + userProf.userId + ' / ' + userProf.password);
                // Got the userProfile check the password and return outcome
                if (userProf.password == req.body.password) {
                    // console.log("req.body."+ req.body.);
                    var userProfile = {}
                    userProfile.userId = req.body.userId;
                    userProfile.userRole = userProf.roles[0];
                    userProfile.businessUnit = userProf.businessUnit;
                    userProfile.lineMgrId = userProf.lineMgrId;
                    console.log("Primary Role for " + req.body.userId + " is " + userProfile.userRole);
                    console.log("userProf.businessUnit: " + JSON.stringify(userProf.businessUnit));
                    console.log("userProf.lineMgrId: " + JSON.stringify(userProf.lineMgrId));

                    switch (userProfile.userRole) {
                        case "hrManager":
                            userProfile.userRoleToDisplay = 'HR Manager';
                            break;
                        case "lineManager":
                            userProfile.userRoleToDisplay = 'Line Manager';
                            break;
                        case "regulator":
                            userProfile.userRoleToDisplay = 'Regulator ';
                            break;
                        case "mccAdmin":
                            userProfile.userRoleToDisplay = 'MCC Admin';
                            break;
                        case "admin":
                            userProfile.userRoleToDisplay = 'Application Admin';
                            break;
                        default:
                            console.log("This shoudn't Happen ##00001## ");
                    }
                    labUtils.sendJsonResponse(res, 200, {
                        userProfile: userProfile,
                        CONST
                    });
                }
                else {
                    labUtils.sendJsonResponse(res, 449, {
                        "outcome": "Invalid username or password",
                        "userProf.firstName": userProf.firstName,
                        "userProf.lastName": userProf.lastName,
                        "userProf.roles": userProf.roles,
                        "Here You go, ur userProf.password": userProf.password,
                        "userProf.passwordHash": userProf.passwordHash,
                        "req.body.password": req.body.password
                    });
                    //"userProf": userProf});
                    return;
                }
            });
    } else {
        if (!req.body.userId && !req.body.password) {
            errMsg = "No userID & password in the request";
        }
        else if (!req.body.userId) {
            errMsg = "Please Enter your User Id";
        }
        else {
            errMsg = "Please Enter your password";
        }

        labUtils.sendJsonResponse(res, 449, {
            "message": errMsg
        });
    }
};