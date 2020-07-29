var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(express.static("./public"));


app.get('/graph', (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(io.engine.clientsCount);


  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log(io.engine.clientsCount);
  });

  socket.on('mousedown', (cords) => {
    socket.broadcast.emit('mousedown', cords);
  });
  socket.on('mouseup',(d)=>{
      socket.broadcast.emit('mouseup',d);
  });
  socket.on('keydown',(key)=>{
      io.emit('keydown',key);
  });
  socket.on('array',(d)=>{
    socket.broadcast.emit('array',d);
  });
  socket.on('text',(d)=>{
    socket.broadcast.emit('text',d);
  })
});

http.listen(PORT, () => {
  console.log('listening');
});
