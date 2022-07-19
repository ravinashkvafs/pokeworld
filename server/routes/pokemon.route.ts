import { getPokemonList, getSpecificPokemon } from '../controllers/pokemon.controller';

const Router = require('express-promise-router')();

Router.route('').get(getPokemonList);

Router.route('/:idOrName').get(getSpecificPokemon);

module.exports = Router;