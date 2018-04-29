
const morgan = require("morgan");
const path = require("path");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(morgan("short"));
let uiPath = path.join(__dirname, "ui", "index.html")

app.get('/', function (req, res) {
    res.sendFile(uiPath);
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

io.emit('some event', { for: 'everyone' });


io.on('connection', function (socket) {
    socket.broadcast.emit('hi');
});


io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});


http.listen(3000, function () {
    console.log("Your application has been started on port 3000!")
});
