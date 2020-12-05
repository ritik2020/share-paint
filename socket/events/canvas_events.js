module.exports = function canvasEvents(socket){
      socket.on('clearCanvas',()=>{
        socket.broadcast.emit('clearCanvas');
      });
      socket.on('blockCanvas',()=>{
        socket.broadcast.emit('blockCanvas');
      });
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