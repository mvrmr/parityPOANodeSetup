//  Everything on Local Machine
//const APPLICATION_SERVER_IP = 'http://xx.xx.xx.xx'; //server IP
const APPLICATION_SERVER_IP = 'http://localhost';

//const MONGODB_SERVER_IP = 'http://localhost';
const MONGODB_SERVER_IP = '127.0.0.1';

//const BLOCKCHAIN_SERVER = 'localhost:8545';
const BLOCKCHAIN_SERVER = 'http://127.0.0.1:8545';

const ACCT0PASSPHRASE = '';  // pass phrase for Acct[0] / first account on the Blockchain node

// Ref: Parity Dev 'Recovery Account with' lot of Ether ==> '0x00a329c0648769A73afAc7F9381E08FB43dBEA72';
// Ref: Parity Dev  'Other Default Account'    ==> 0x00296DeBe65f9F0f4c0D269939e061e4515594e4

const ENABLE_CACHE = 'Y';   // Use data from MongoDB cash for DashBoard,  non 'Y' gets data from Ethereum Smart Contract
const APPLICATION_SERVER_BACKEND_PORT = 6010;
const APPLICATION_SERVER_FRONTEND_PORT = 3010;

// No changes needed below this for general server configuaration

const APP_SERVER = `${APPLICATION_SERVER_IP}:${APPLICATION_SERVER_BACKEND_PORT}`;
const API_SERVER = `${APPLICATION_SERVER_IP}:${APPLICATION_SERVER_BACKEND_PORT}`;
console.log("API_SERVER : " + API_SERVER);
console.log("APP_SERVER : " + APP_SERVER);

export default {
  APPLICATION_SERVER_BACKEND_PORT,
  APPLICATION_SERVER_FRONTEND_PORT,
  API_SERVER,
  APP_SERVER,
  BLOCKCHAIN_SERVER,
  DB: `mongodb://${MONGODB_SERVER_IP}/localDB`,
  ACCT0PASSPHRASE,
  ENABLE_CACHE,
  MONGODB_SERVER_IP
};