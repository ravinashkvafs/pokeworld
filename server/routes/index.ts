export { };

const app = require('express')();

const pokemon = require('./pokemon.route');

app.use('/pokemon', pokemon);

module.exports = app;