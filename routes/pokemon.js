var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

const errorHandler = err => {
  console.log("Error");
  console.log(error)
}

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll().then(pokemon => {
    res.render('pokemon/index', {pokemon: pokemon});
  }).catch(errorHandler)
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function() {
    res.redirect('/pokemon')
  })
});

// GET /pokemon/:name - renders a show page with information about the pokemon by name 
router.get('/:name', (req, res) => {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name).toLowerCase()}`;
  // Use request to call the API
  axios.get(pokemonUrl).then(function(apiResponse) {
    var pokemon = apiResponse.data;
    res.render('pokemon/show', {pokemon})
  })
})

module.exports = router;
