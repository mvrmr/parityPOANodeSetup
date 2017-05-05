
Application / Project Setup
1) Git pull this project repository from git hub
2) cd sampleParityNodeJsApp   <== Go to project folder
3) npm install  <== Installs dependencies
4) npm run mongoDB-restore  (OR) mongorestore --drop -d localDB 'data/mongoDBdump/localDB',   may need to added --host mongoDB_server_ip:Port to this command
4) Update ==> Blockchain & MongoDB servers <== in Server Configuarations file :  sampleParityNodeJsApp\src\tools\serverConfig.js
6) npm start  <== Starts application serving on the port assigned to APPLICATION_SERVER_BACKEND_PORT constant
  in serverConfig.js, initial set to port 5000
7) login to application as user: mohan@testfed.com,  password: pwd
    a) ???????????????????

==>  You should be all set to use the application  <==