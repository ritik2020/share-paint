function socketEvents(http){
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        io.emit('update connection count',io.engine.clientsCount);
      
        require('./events/canvas_events')(socket);
        require('./events/textbox_events')(socket);
        
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
          io.emit('update connection count',io.engine.clientsCount);
        });        
      });
}

module.exports = {
    socketEvents: socketEvents
};