const express = require('express');
const cookieParser = require ('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require ('./Routes/index')


const server = express();
server.use(cookieParser());
server.use(morgan('dev'));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
server.use('/', routes);
  


  module.exports = server;