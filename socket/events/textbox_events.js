module.exports = function textBoxEvents(socket){
    socket.on('text',(d)=>{
        socket.broadcast.emit('text',d);
      });
    
      socket.on("textChange",(d)=>{
        socket.broadcast.emit("textChange",d);
      });
}