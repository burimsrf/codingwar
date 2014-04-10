var WebSocketServer = require('websocket').server;
var http = require('http');
var webSocketsServerPort = 1337;
var clients = [ ];

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin);

    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {

            console.log((new Date()) + " Clients: " + clients.length + " Message: " + message.utf8Data);

            // we want to keep history of all sent messages
            var obj = {
                time: (new Date()).getTime(),
                text: message.utf8Data
            };

            // broadcast message to all connected clients
            var json = JSON.stringify({ type:'message', data: obj });
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    });
});