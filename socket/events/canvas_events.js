module.exports = function canvasEvents(socket){
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
}