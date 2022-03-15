const express = require('express');
const path = require('path');
const videos = require('./routes/videos');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.ifpkz.mongodb.net/testDB?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})  .catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
  });

app.use(cookieParser('sergey-secret'));
app.use(session({
  secret:"sergey",
  resave: "true",
  saveUninitialized: "true"
}));
app.use(bodyparser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res)=>{
  res.end("root requested")
});
app.use('/videos', videos);
app.use('/videos/delete', videos);

app.use((req, res, next)=>{
  var err = new Error(`Resource Not Found ${req.url}`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next)=>{
  if (err.status === 404){
    res.status(404).send(`Cannot find ${req.url}`);
  }
});

module.exports = app;
