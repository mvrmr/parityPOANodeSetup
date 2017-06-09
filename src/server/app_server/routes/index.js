var express = require('express');
var router = express.Router();

var ctrlMisc = require('../controllers/misc');
var ctrlMain = require('../controllers/main');
var ctrlLogin = require('../controllers/login');

router.get('/downLoadDashBoardData/:fileFolder/:fileSubFolder/:fileName', ctrlMisc.downLoadDashBoardData);
router.get('/login', ctrlLogin.login);
//router.get('/', ctrlLogin.login);
router.get('/', ctrlLogin.adminPage);

router.post('/verifylogin', ctrlLogin.verifyUserLogin);

router.get('/getTranscript', ctrlMisc.getTranscript);
router.get('/promiseResetMongoDbData', ctrlMisc.promiseResetMongoDbData);

module.exports = router;
