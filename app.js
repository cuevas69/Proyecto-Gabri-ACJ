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

mongoose.connect("mongodb://localhost/pokemon", function (err, res) {
  if (err) {
    console.log("ERROR: connecting to Database. " + err);
  }
  app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
  });
});

// API routes
var pokemon = express.Router();

pokemon
  .route("/pokemon")
  .get(PokemonCtrl.findAllPokemons)
  .post(PokemonCtrl.addPokemon);

pokemon
  .route("/pokemon/:id")
  .get(PokemonCtrl.findByNombre)
  .put(PokemonCtrl.updatePokemon)
  .delete(PokemonCtrl.deletePokemon);

app.use("/api", pokemon);

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
