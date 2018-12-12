
// load the express library, which should be in the node_modules folder
// if you don't have a node_modules folder inside this basic-template folder
// see the README.md file in the root directory of this repo for instructions
const express = require('express');
const request = require('request');
const fs = require('fs');
const { exec } = require('child_process');

// here we call the express() function which returns a default express server
// application. we assign it to a variable called 'app'
const app = express()

// here we create a variable that will contain our port number, this is set
// either in the terminal when we launch the app like: node server.js 3000
// otherwise  defaults to port 80, which requires sudo, ex: sudo node server.js
const port = process.argv[2] || 3000

const http = require('http').Server(app)

const io = require('socket.io')(http)

// we can serve up an entire directory of static files using express.static()
// instead of having to define all the app.get() paths individually
app.use( express.static(__dirname+'/www') )




function getWatsonData(text, callback) {
  text = encodeURIComponent(text)
  let apikey = 'kHNqXdZWxluLI3upgclMCRNapSmUWQaB95mAlZeIcCKZ'
  let terminalCommand = `curl -X GET --user "apikey:${apikey}" / "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21&text=${text}"`
  exec(terminalCommand, (error, stdout, stderr)=> {
    if (error){
      console.error(`exec error: ${error}`);
      return;
    }
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    callback(stdout)
  })
}


// here we use socket.io to listen for connections from new clients
io.on('connection', function(socket){
    // when a user connects, this happens
    console.log('new user!')

    // here we're listening for 'enter-click' event from clients
    // event we made up and we emit on client side (index.html)
    socket.on('apiReq', function(text){
        // when we receive the event, pass the data from the client to all other connected clients using broadcast.emit.
        // let's emit an event called 'new-msg' which the clients are listening for.
        // socket.emit('new-msg',data)
        getWatsonData(text, function(json){
            socket.emit('apiRes', json)
        })

    })

    // when this particular user disconnects, log this in the terminal
    socket.on('disconnect',function(){
        console.log('user left :(')
        })

})


// SHIFFMAN STUFF
// app.get('/all', sendAll);
//
// function sendAll(request, response) {
//     response.send()
// }
// function sendFlower(request, response) {
//     var data = request.params;
//     response.send("I love " + data.flower + " too");
// }
//////

// start listening for requests from potential clients
http.listen( port, function(err){
    if(err){ // if there's an error, log it to terminal
        console.log(err)
    } else { // otherwise, log the following...
        console.log(`server is listening, visit http://localhost:${port}`)
    }
})
