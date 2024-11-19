var express = require('express');
const { listen } = require("socket.io");

var app = express();
var server = require('http').createServer(app);

var io = require("socket.io")(server);

let users = [];
let connections = [];

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});

// Corrected event listener
io.on("connection", function (socket) {
    connections.push(socket);
    console.log("Connected: %s socket(s) connected", connections.length);

    // Handle disconnection
    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s socket(s) connected", connections.length);
    });

    // Handle message sending
    socket.on("send message", function (data) {
        console.log(data);
        io.sockets.emit("new message", { msg: data });
    });
});
