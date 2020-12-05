module.exports = function canvasEvents(socket){
      socket.on('unblockCanvas',()=>{
        socket.broadcast.emit('unblockCanvas');
      })
      socket.on('mousedown', (cords) => {
        socket.broadcast.emit('mousedown', cords);
      });
      socket.on('mouseup',(d)=>{
          socket.broadcast.emit('mouseup',d);
      });
      socket.on('array',(d)=>{
        socket.broadcast.emit('array',d);
      });
}