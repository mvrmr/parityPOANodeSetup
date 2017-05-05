import SERVERCONFIG from './tools/serverConfig';
const PROCESS = process.env.npm_lifecycle_event;
const ASSETS = 'assets';

// ACCT0PASSPHRASE defined below holds the account password for web3.eth.accounts[0],
// which is used for unlocking/locking account for blockchain transactions across modules

export default {
  MYNAME: 'I am mcc_poc for BlockChain POC/Pilot/Project',
  SAMPLE_DATA: [
    {value: 100, legend: 'limit'},
    {value: 110, legend: 'trigger'}
  ],
  SAMPLE_TABLES: {
    HISTORY: 'history',
    HQLA: 'hqla',
  },
  PATHS: {
    CSS: './src/client/scss/',
    ASSETS,
    ENTRY: './src/client/javascript/page',
    PUBLIC: (PROCESS === 'build') ? '/' : '', //The publicPath specifies the public URL address of the output files when referenced in a browser e.g. http://mycdn.com/
  },
  PROCESS,
  BLOCKCHAIN_NODE: SERVERCONFIG.BLOCKCHAIN_SERVER,
  API_SERVER: SERVERCONFIG.API_SERVER,
  APP_SERVER: SERVERCONFIG.APP_SERVER,
  ACCT0PASSPHRASE: SERVERCONFIG.ACCT0PASSPHRASE,
  BACKEND_SERVER_PORT: SERVERCONFIG.APPLICATION_SERVER_BACKEND_PORT,
  FRONTEND_SERVER_PORT: SERVERCONFIG.APPLICATION_SERVER_FRONTEND_PORT,
  ENABLE_CACHE:SERVERCONFIG.ENABLE_CACHE,
  MONGODB_SERVER_IP:SERVERCONFIG.MONGODB_SERVER_IP,
};

