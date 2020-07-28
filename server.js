var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(express.static("./public"));


app.get('/', (req, res) => {
    res.render("index");
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('mousedown', (cords) => {
      console.log(cords);
    socket.broadcast.emit('mousedown', cords);
  });
  socket.on('mouseup',(d)=>{
      socket.broadcast.emit('mouseup',d);
  });
  socket.on('keydown',(key)=>{
      console.log(key);
      io.emit('keydown',key);
  });
  socket.on('array',(d)=>{
    console.log(d);
    socket.broadcast.emit('array',d);
  });
  socket.on('text',(d)=>{
    socket.broadcast.emit('text',d);
  })
});

http.listen(PORT, () => {
  console.log('listening');
});
