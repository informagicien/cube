var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
app.listen(8888);

function handler (req, res) {
  fs.readFile(__dirname + '/video.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading');
    }
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(data);
  });
}

io.sockets.on('connection', function (canal){
	
	console.log('New connect refresh');
	
	canal.on('play', function (time){
		console.log('Time position : '+time);
		canal.broadcast.emit('playit', time);
	}
	);
	
	canal.on('stop', function (time){
		console.log('Time position : '+time);
		canal.broadcast.emit('stopit', time);
	}
	);
});