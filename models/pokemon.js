var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var pokemon = new Schema({
  nombre: { type: String },
  id: { type: Number },
  type: { type: String },
  stat: { type: String },
});

module.exports = mongoose.model("Pokemon", pokemon);