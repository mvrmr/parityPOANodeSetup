import CONST from '../../../CONSTANTS';
//var request = require('request');

// Present overview (User already logged in)
module.exports.home = function (req, res) {
  res.render('layout/home', { title: 'Lab Events Home Page', CONST, userRole: req.body.userRole });
};

//Render a generic error message
var _showError = function (req, res, status) {
  var title, content;
  switch (status) {
    case 404:
      title = "404, page not found";
      content = "oops, looks like we can't find this page.  Sorry.";
      break;
    case 449:
      title = status + ", " + res.title;
      content = res.content;
      break;
    default:
      title = status + ", something's gone wrong";
      content = "Something, somewhere has gone wrong.";
  }

  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
};
