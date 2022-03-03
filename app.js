var express = require('express'),
 mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require('swagger-jsdoc');
var  bcrypt  =  require ( 'bcrypt' );
var swaggerUi = require('swagger-ui-express')

var indexRouter = require('./routes/index');
var objetosRouter = require('./routes/objetos');
var pokemonRouter = require('./routes/pokemons')

var app = express();
var hash = '$2b$10$xrzO2R3ob3NJM//IQgWNAuzeHl725PcHF067/kEfSVJBPnXnFtt0q';

function middle(req, res, next) {
    const { password } = req.headers
  
      if(bcrypt.compareSync(password, hash)){
          next();
      }
      else{
          res.status(401).send(`Acceso restringido, por favor, incluya la palabra secreta en el parámetro 'password' en la cabera de la petición`);
      };  
  }
  
app.use(middle);

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
