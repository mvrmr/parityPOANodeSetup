import CONST from '../../../CONSTANTS';
import labUtils from '../../../tools/labutils';
var request = require('request');

module.exports.login = function (req, res) {
  res.render('login', { title: 'MCC Login', CONST, userRole: req.body.userRole });
};

// Verify the login and present over view screen based on the role
module.exports.verifyUserLogin = function (req, res) {
  console.log("in login.js: module.exports.verifyUserLogin");

  if (req.body && req.body.userId && req.body.password) {
    var requestOptions, urlPath, postdata;

    urlPath = CONST.API_SERVER + "/api/verifyloginAPI/";
    postdata = {
      userId: req.body.userId,
      password: req.body.password
    };
    requestOptions = {
      url: urlPath,
      method: "POST",
      json: postdata,
      headers: { 'Cache-Control': 'no-cache' }
    };

    request(
      requestOptions,
      function (err, response) {
        if (response.statusCode === 200) {
          //console.log("JSON.stringify(req.session): " + JSON.stringify(req.session));
          req.session.userProfile = response.body.userProfile;
          
          console.log("in login.js, UserProfile from API: " + response.body.userProfile.userRole);
          if (response.body.userProfile.userRole == 'admin') {
            urlPath = CONST.API_SERVER + "api/applicationAdministration/";
            console.log("Not Active urlPath for res.redirect for admin User: " + urlPath + "\n");
            //res.redirect(urlPath);
            //res.render('adminPage', { title: 'MCC Login', CONST, userRole: response.body.userProfile.userRoleToDisplay });
            res.render('adminPage', { title: 'MCC Application Administration', userRole: response.body.userProfile.userRoleToDisplay });
          }
        } else {
          console.log("in login.js: request response error: " + response.body.outcome);
          res.content = response.body.outcome;
          labUtils.showError(req, res, response.statusCode);
        }
      }
    );
  } else {
    if (!req.body.userId && !req.body.password) {
      res.content = "Please Enter your userID and password, Hit Submit button";
      res.title = " User Id & Password not entered";
      labUtils.showError(req, res, 404);
    }
    else if (!req.body.userId) {
      res.content = "Please Enter your userID and password, Hit Submit button";
      res.title = " User Id not entered";
      labUtils.showError(req, res, 404);
    }
    else {
      res.content = "Please Enter your userID and password, Hit Submit button";
      res.title = " password not entered";
      labUtils.showError(req, res, 404);
    }
    labUtils.showError(req, res, 449);
  };
};