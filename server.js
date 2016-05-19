var ws = require("nodejs-websocket")

var clients = []
var messages = []

var server = ws.createServer(function(conn){
    clients.push(conn);
    
    console.log("new connection");

    conn.on("text", function(receivedMessage){
        var column = receivedMessage
    	
        console.log("recieved")
        clients.forEach(function(client){
            client.sendText(column); 

        })
        conn.sendText(JSON.stringify({lock: true}));

    })
    conn.on("close", function(code, reason){
        clients.splice(clients.indexOf(conn), 1);
        clients.forEach(function(client){
            client.sendText(JSON.stringify({refresh: true}))
        })
        console.log("connection closed for "+reason)
    })
}).listen(8001)

