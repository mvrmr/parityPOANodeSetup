// Utility function that accepts response object, a status code, and a data object
//Web3 = require('web3');
import sha256 from 'js-sha256';
import crypto from 'crypto';

module.exports.sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

//Render a generic error message
module.exports.showError = function (req, res, status) {
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
  //comes here if wrong username or pass
  res.render('login', {
    title: title,
    error_msg: content,
  });
};

module.exports.encrypt = function (key, data) {
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

module.exports.decrypt = function(key, data) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    console.log("in labUtils.decrypt: decrypted text:" + decrypted);
    return decrypted;
};

/*    May be useful to generate key if required
// Don't hard code keys! They should be in environment variables!
var encryptor = require('simple-encryptor')({
  key: 'my secret key',
  hmac: false,
  debug: true
});

&&& --- &&&

Generating a key
If you're on a *nix system then the easiest way to generate a random string for a crypto key is to use /dev/urandom. The following will print out 32 random characters of lower case letters, upper case letters, and numbers:

$ echo "$(< /dev/urandom tr -dc A-Za-z0-9 | head -c 32)"
*/

// Returns hash created by hasing inputString hashCount times
module.exports.hashString = function (inputString, hashCount) {
  // If no hashCount hash it twice
  hashCount = typeof hashCount !== 'undefined' ? hashCount : 2;

  var hashedString = inputString;
  for (var loopCtr = 1; loopCtr <= hashCount; loopCtr++) {
    hashedString = sha256(hashedString);
    //console.log("in labUtils, hashedString("+ loopCtr +")=" + hashedString);
  }

  return hashedString;
};

/*jshint browser:true, devel:true*/
/*jshint -W097*/ //DEVEL
'use strict';
/**
 * Convert From/To Binary/Decimal/Hexadecimal in JavaScript
 * https://gist.github.com/faisalman
 *
 * Copyright 2012-2015, Faisalman <fyzlman@gmail.com>
 * Licensed under The MIT License
 * http://www.opensource.org/licenses/mit-license
 */

module.exports.convertBase = function () {

  function convertBase(baseFrom, baseTo) {
    return function (num) {
      return parseInt(num, baseFrom).toString(baseTo);

    };
  }

  // binary to decimal
  convertBase.bin2dec = convertBase(2, 10);

  // binary to hexadecimal
  convertBase.bin2hex = convertBase(2, 16);

  // decimal to binary
  convertBase.dec2bin = convertBase(10, 2);

  // decimal to hexadecimal
  convertBase.dec2hex = convertBase(10, 16);

  // hexadecimal to binary
  convertBase.hex2bin = convertBase(16, 2);

  // hexadecimal to decimal
  convertBase.hex2dec = convertBase(16, 10);

  return convertBase;
}();

/*
 console.log(convertBase.bin2dec('111')); // '7'
 console.log(convertBase.dec2hex('42')); // '2a'
 console.log(convertBase.hex2bin('f8')); // '11111000'
 console.log(convertBase.dec2bin('22')); // '10110'
 */

module.exports.asc2hex = function (pStr) {
  var tempstr = '';
  for (var a = 0; a < pStr.length; a++) {
    tempstr = tempstr + pStr.charCodeAt(a).toString(16);
  }
  return tempstr;
};

module.exports.hex2asc = function (pStr) {
  var tempstr = '';
  for (var b = 0; b < pStr.length; b += 2) {
    tempstr = tempstr + String.fromCharCode(parseInt(pStr.substr(b, 2), 16));
  }
  return tempstr;
};


module.exports.categoriesInflowToSelect = function () {
  var categoriesInflowToSelect = [
    {
      name: "Inflows from derivatives",
      weight: 1.00
    }, {
      name: "Other inflows",
      weight: 1.00
    }, {
      name: "Level 1 collateral excluding extremely high quality covered bonds",
      weight: 1.00
    }
  ];
  return categoriesInflowToSelect;
};

module.exports.categoriesHQLAToSelect = function () {
  var categoriesHQLAToSelect = [
    {
      name: "Central government assets",
      weight: 1.00
    }, {
      name: "Coins and banknotes",
      weight: 1.00
    }, {
      name: "Central bank assets",
      weight: 1.00
    }, {
      name: "High quality covered bonds (CQS2)",
      weight: 0.85
    }, {
      name: "Corporate debt securities (CQS1)",
      weight: 0.85
    }, {
      name: "Shares (major stock index)",
      weight: 0.50
    }
  ];
  return categoriesHQLAToSelect;
};

module.exports.categoriesOutflowToSelect = function () {
  var categoriesOutflowToSelect = [
    {
      name: "Deposits where the payout has been agreed within the following 30 days",
      weight: 1.00
    }, {
      name: "Stable deposits",
      weight: 0.05
    }, {
      name: "Collateral other than Level 1 assets collateral posted for derivatives",
      weight: 0.20
    }, {
      name: "Historical look back approach",
      weight: 1.00
    }, {
      name: "Credit cards",
      weight: 1.00 //Weight not found in excel sheet
    }, {
      name: "Overdrafts",
      weight: 1.00 //Weight not found in excel sheet
    }
  ];
  return categoriesOutflowToSelect;
};


module.exports.intToDate = function (dateInt) {
  var dateString = dateInt.toString();
  var year = dateString.substring(0, 4);
  var month = dateString.substring(4, 6);
  var day = dateString.substring(6, 8);
  return  day + "-" + month + "-" + year;
};

module.exports.dateToInt = function (date) {
  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  var day = date.substring(8, 10);
  return parseInt(year + month + day);
};

module.exports.levelHQLAToString = function() {
  var levelToSelect = [
    "level 1",
    "level 2A",
    "level 2B"
  ];
  return levelToSelect;
};

module.exports.levelOutflowToString = function() {
  var levelToSelect = [
    "1.1.1",
    "1.1.4",
    "1.1.6"
  ];
  return levelToSelect;
};

module.exports.levelInflowToString = function() {
  var levelToSelect = [
    "1.1",
    "1.2"
  ];
  return levelToSelect;
};

/*function typesHQLAToString(type) {
  var typesToSelect = [
    "Notes",
    "Cash",
    "Bond",
    "MiniBond",
    "Simple",
    "Preferred",
    "Empty"
  ];
  return typesToSelect[type];
}*/
