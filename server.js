const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketEvents = require('./socket/socket_main').socketEvents(http);
const path = require("path");

const mongoose = require('mongoose');
const router = express.Router();
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");


//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname , "public")));
console.log(path.join(__dirname,"public"));

require('./config/passport')(passport)
//mongoose
mongoose.connect('mongodb+srv://rohan:rohan123@share-paint.j1fni.mongodb.net/share-paint?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));


//express session
app.use(session({
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
  next();
  })
  
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));





http.listen(PORT, () => {
  console.log('listening');
});
