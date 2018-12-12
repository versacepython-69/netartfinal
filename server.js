
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




var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Require our config variables.
//var config = require('./config');

// The text that we want to analyze the tone of.
//var text = "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since. \“Whenever you feel like criticizing any one,\” he told me, \“just remember that all the people in this world haven’t had the advantages that you’ve had.\"";


// Initialize the Tone Analyzer by giving it our credentials/loads
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: 'kHNqXdZWxluLI3upgclMCRNapSmUWQaB95mAlZeIcCKZ',
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
});

// Use our Tone Analyzer variable to analyze the tone.

function getWatsonData(text, callback) {

  // Turn our text into valid json.
  var input = { "text": text };

  // The format that the tone analyzer needs.
  var params =
          {
          'tone_input': input,
          'content_type': 'application/json'
          };

  toneAnalyzer.tone(params, function(error, response)
          {
          // checking 4 error.
          if (error)
                  {
                  console.log('Error:', error);
                  }
          // No error, we get tone/result.
          else
                  {
                  // tone of the text, according to watson. converts a JavaScript object or value to a JSON string
                  var tone = JSON.stringify(response, null, 2)

                  // Output Watson's tone analysis to the console.
                  console.log("In \'" + text + "\' I sense feelings of:\n");
                  console.log(tone);
                  callback(tone)
                  }
          });
}

//getWatsonData("love", function(json){
    //socket.emit('apiRes', json)
    //console.log(json)
//})


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

        //input or text as argument? confused on how to integrate getWatsonData into toneAnalyzer.tone function
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
