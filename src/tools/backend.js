//import d from 'debug';
import serverApp from '../server/server';
import http from 'http';
import CONST from '../CONSTANTS';
//const debug = d('Loc8r:server');
const SERVERPORT = CONST.BACKEND_SERVER_PORT;

/**
 * BACK END SETUP
 */
const port = process.env.PORT || SERVERPORT;
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
//  debug('Listening on ' + bind);
};

serverApp.set('port', port);
//Create HTTP server
const server = http.createServer(serverApp);

//Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log("Server started and Listening on port " + port);
export default server;
