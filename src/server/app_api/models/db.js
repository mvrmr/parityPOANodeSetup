import SERVERCONFIG from '../../../tools/serverConfig';
var mongoose = require('mongoose');
var gracefulShutdown;
var labUtils = require('../../../tools/labutils');

function toLower(v) {
  return v.toLowerCase();
}
// MongoDB BRING IN YOUR SCHEMAS & MODELS
var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  userId: { type: String, required: true },
  mailId: { type: String, set: toLower },
  roles: [String],
  publicAddress: String,
  password: String,
  passwordHash: { type: String, set: labUtils.hashString },
  encryptionKey: String,
  decryptionKey: String,
  salt: String,
  businessUnit: String,
  lineMgrId: String
});

// transcript Data Cache
var transcriptSchema = new mongoose.Schema({
  businessUnit: String,
  lineMgrId: String,
  transcript: String
});

mongoose.model('UserProfile', userSchema, 'userprofiles');
mongoose.model('Transcript', transcriptSchema, 'transcripts');

var dbURI = SERVERCONFIG.DB;
if (process.env.NODE_ENV === 'production') {
  //dbURI = process.env.MONGOLAB_URI;
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
  // console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  // console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});
