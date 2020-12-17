module.exports = function textBoxEvents(socket){
    socket.on('text',(d)=>{
        socket.broadcast.emit('text',d);
      });
    
      socket.on("message",(d)=>{
        socket.broadcast.emit("message",d);
      });
}