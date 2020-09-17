const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketEvents = require('./socket/socket_main').socketEvents(http);

app.set("view engine", "ejs");

app.use(express.static("./public"));

app.get("/",(req,res)=>{
  res.render("index");
});

app.get('/paint', (req, res) => {
    res.render("paint");
});



http.listen(PORT, () => {
  console.log('listening');
});
