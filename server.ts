// var ws = require("nodejs-websocket")

// var clients = []
// var messages = []

// var server = ws.createServer(function(conn){
//     clients.push(conn);

//     console.log("new connection");

//     conn.on("text", function(receivedMessage){
//         var column = receivedMessage

//         console.log("recieved")
//         clients.forEach(function(client){
//             client.sendText(column); 

//         })
//         conn.sendText(JSON.stringify({lock: true}));

//     })
//     conn.on("close", function(code, reason){
//         clients.splice(clients.indexOf(conn), 1);
//         clients.forEach(function(client){
//             client.sendText(JSON.stringify({refresh: true}))
//         })
//         console.log("connection closed for "+reason)
//     })
// }).listen(8001)




var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis   = require("redis");
var client  = redis.createClient();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
var inQueue = 0;
var gameInstantiating = false;
// tracks game id's
client.set("gameId", 0);
// new connection
io.on('connection', function(socket){
    inQueue++;
    console.log(socket.id + " has connected")
    io.sockets.connected[socket.id].emit('matching', "Please wait while we pair you with another player....");
    // add id of socket into the queue
    client.rpush("gameQueue", String(socket.id));
        // increments the gameId value to keep each game unique
        client.incr("gameId"); 
        createGame();
        socket.on('message', function(msg){
            console.log('message: ' + msg)
            var game = JSON.parse(msg);
            client.hmget(game.gameId, 'player1', 'player2', function(err, reply){
                var player1 = reply[0];
                var player2 = reply[1];
                io.sockets.connected[player1].emit('message', msg);
                io.sockets.connected[player2].emit('message', msg);
                io.sockets.connected[socket.id].emit('message', JSON.stringify({lock: true}));
            });
        // io.sockets.connected[String(game.player1)].emit('message' ,msg);

    });
        socket.on('disconnect', function(){
            console.log(socket.id + ' has disconnected');
            console.log("In Queue: "+ inQueue);
            // removes disconnected socket from the queue
            client.lrem("gameQueue", -1, String(socket.id))
        });
    });

http.listen(3000, function(){
    console.log('listening on *: 3000');
});


var createGame = function(){
    if(!gameInstantiating) {
        if (inQueue >= 2) {
            gameInstantiating = true;
            client.lpop("gameQueue", function(err, player1){
                inQueue = inQueue - 1;
                client.lpop("gameQueue", function(err, player2){
                    inQueue = inQueue - 1;
                    client.get("gameId", function(err, id){
                        client.hmset(id, "player1", player1, "player2", player2);
                        console.log("player1: " + player1);
                        console.log("player2: " + player2);
                        io.sockets.connected[player1].emit('game-id', String(id));
                        io.sockets.connected[player2].emit('game-id', String(id));
                        gameInstantiating = false;
                        console.log("In Queue: "+ inQueue);
                        createGame();
                    });
                });
            });
        };
    };
};