var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.get("/",(req,res)=>{
  res.render("index");
});

app.get('/graph', (req, res) => {
    res.render("paint");
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("changeColor", (color)=>{
    socket.broadcast.emit('changeColor', color);
  });

  socket.on('makeColorActive',(d)=>{
    socket.broadcast.emit('makeColorActive',d);
  });

  socket.on('makeToolActive',(d)=>{
    socket.broadcast.emit('makeToolActive',d);
  })

  socket.on('changeTool',(tool)=>{
    socket.broadcast.emit('changeTool', tool);
  });

  socket.on('clearCanvas',()=>{
    socket.broadcast.emit('clearCanvas');
  });


  socket.on('mousedown', (cords) => {
    socket.broadcast.emit('mousedown', cords);
  });
  socket.on('mouseup',(d)=>{
      socket.broadcast.emit('mouseup',d);
  });
  
  socket.on('array',(d)=>{
    socket.broadcast.emit('array',d);
  });
  socket.on('text',(d)=>{
    socket.broadcast.emit('text',d);
  });
  socket.on("textChange",(d)=>{
    io.emit("textChange",d);
  });
});

http.listen(PORT, () => {
  console.log('listening');
});
