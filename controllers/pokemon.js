//File: controllers/pokemon.js
var mongoose = require("mongoose");
var Pokemon = mongoose.model("Pokemon");

//GET - Devuelve todos los pokemon DB
exports.findAllPokemon = function (req, res) {
  Pokemon.find(function (err, pokemon) {
    if (err) res.send(500, err.message);

    console.log("GET /pokemon");
    res.status(200).jsonp(pokemon);
  });
};

//GET -Devuelve un pokemon especificando el nombre
exports.findByNombre = function(req, res) {
    Pokemon.findByNombre(req.params.nombre, function(err, pokemon) {
    if(err) return res.send(500, err.message);

    console.log('GET /pokemon/' + req.params.nombre);
        res.status(200).jsonp(pokemon);
    });
};

//POST - Insertar nuevo Pokemon en la DB
exports.addPokemon = function (req, res) {
    console.log("POST");
    console.log(req.body);
  
    var pokemon = new Pokemon({
      nombre: req.body.nombre,
      id: req.body.id,
      tipo: req.body.tipo,
      genero: req.body.genero,
    });
  
    pokemon.save(function (err, pokemon) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(pokemon);
    });
};

//PUT - Actualizar registro existente
exports.updatePokemon = function (req, res) {
    Pokemon.findById(req.params.id, function (err, pokemon) {
      pokemon.nombre = req.body.nombre;
      pokemon.id = req.body.id;
      pokemon.tipo = req.body.tipo;
      pokemon.genero = req.body.genero;
  
      pokemon.save(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(pokemon);
      });
    });
};

//DELETE - Eliminar pokemon buscando por nombre
exports.deletePokemon = function (req, res) {
    Pokemon.findByNombre(req.params.nombre, function (err, pokemon) {
      pokemon.remove(function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send();
      });
    });
};