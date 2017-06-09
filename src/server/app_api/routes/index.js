var express = require('express');
var router = express.Router();

var ctrlUsersAPI = require('../controllers/loginAPI');
var miscAPI = require('../controllers/miscAPI');
var ctrlmongoDbAPI = require('../controllers/mongoDbAPI');

// MCC links
router.post('/verifyloginAPI/', ctrlUsersAPI.verifyUserLoginAPI);

// BOI MCC Data API links
router.get('/getAcctBalances/', miscAPI.getAcctBalances);
router.get('/transferEther/', miscAPI.transferEther);

//Cached Data API links
router.post('/getTranscriptDataFromMongoDB/', ctrlmongoDbAPI.getTranscriptDataFromMongoDB);
router.post('/writeTranscriptDataToMongoDB/', ctrlmongoDbAPI.writeTranscriptDataToMongoDB);
router.get('/removeTranscriptDataFromMongoDB/', ctrlmongoDbAPI.removeTranscriptDataFromMongoDB);

// These links need clean up
var encryptDecrypt = require('../controllers/encryptDecryptAPI.js');

router.get('/testEncryptDecrypt/:inputText', encryptDecrypt.testEncryptDecrypt);
router.get('/testEncryptDecryptWithAssymtricKeys/:inputText', encryptDecrypt.testEncryptDecryptWithAssymtricKeys);
module.exports = router;
