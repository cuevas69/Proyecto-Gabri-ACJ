var express = require('express'),
 mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express')

var indexRouter = require('./routes/index');
var objetosRouter = require('./routes/objetos');
var pokemonRouter = require('./routes/pokemons')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
 swaggerDefinition: {
  info: {
   title: "heroku-test",
   version: "0.0.0",
   description: "jaja this is a test",
  },
 },
 apis: [path.join(__dirname, "/routes/*.js")],
};
var swaggerSpecs = swaggerJsdoc(options);

app.use('/', indexRouter);
app.use('/objetos', objetosRouter);
app.use('/pokemon', pokemonRouter)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;
