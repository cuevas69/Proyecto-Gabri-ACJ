var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use(router);

mongoose.connect("mongodb://localhost/pokemon", function (err, res) {
  if (err) {
    console.log("ERROR: connecting to Database. " + err);
  }
  app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
  });
});

var PokemonCtrl = require("./controllers/pokemon");

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