'use strict'
//cargamos el modulo mongoose
 var mongoose = require('mongoose');
 //utilizar esquemas de mongoose
 var Schema = mongoose.Schema;
//Creamos el schema artista
 var ArtistSchema = Schema({
 	name: String,
 	description: String,
 	image: String
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo

 module.exports = mongoose.model('Artist',ArtistSchema)