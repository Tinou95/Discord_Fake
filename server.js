console.log("charged");
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let user = 0;
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/index.html')

})
app.get("/client.js", function (req, res) {
	res.setHeader('Content-Type', 'text/javascript');
	res.sendFile(__dirname + '/client.js');
  });
  
app.get("/css/style.css", function (req, res) {
	res.setHeader('Content-Type', 'text/css');
	res.sendFile(__dirname + '/css/style.css');
});

io.on('connection', function(socket){
	user += 1;
	console.log("le nombre d'utilisateur est de :" + user)
	console.log("a user is connected"),
	socket.on('disconnect', function(){
		console.log("a user is disconnected")
		user -= 1;
		console.log("le nombre d'utilisateur est de :" + user)
	}),
	socket.on('chat message', function(msg){
		console.log("message reçu : " + msg)
		io.emit('chat message', msg)
	})
})

http.listen(3000, function () {
	console.log("Server running on : 3000")
})