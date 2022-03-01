import fetch from 'node-fetch';
import mongoose from 'mongoose';

await mongoose.connect('');

const Schema = mongoose.Schema;

const pokemon = new Schema({
  _id: Number,
  name: String,
  stats: [{ base_stat: Number, effort: Number, stat: { name: String } }],
  types: [{ slot: Number, type: { type: {name: String} } }]
});
const Pokemon = mongoose.model('Pokemon', pokemon);

async function fetchPokemon(id) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => { return data });
}


async function dumpPokemon() {
    for (let id = 1; id <= 898; id++) {
        const json = await fetchPokemon(id);
        const poke = new Pokemon();
        poke._id = id;
        poke.name = json.name;
        poke.stats = json.stats;
        poke.types = json.types;
        await poke.save();
        console.log("yay! ",json.name)
    }
}

dumpPokemon();

