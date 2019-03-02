var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 8888;


server.listen(port, () => console.log('on port ' + port))

io.on('connection', onConnection);

var connectedSocket = null;
function onConnection(socket){
    connectedSocket = socket;
}


const SerialPort = require('serialport');
const sport = new SerialPort('/dev/ttyACM0', () => {
  console.log('SerialPort Opened');
});

server.on("connection", (socket) => {
  console.info(`Client connected`);
  
});
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\n'
});

sport.pipe(parser);
parser.on('data', function (data) {
  io.emit('data', { data: data });
  console.log(data);
});
