'use strict'
/*IMPORTAMOS EL MODULO DE MONGOOSE*/
 var mongoose = require('mongoose');
 /*UTILIZAMOS SCHEMAS DE MONGOOSE*/
 var Schema = mongoose.Schema;
//DEFINIMOS ATRIBUTOS DEL SCHEMA DE ARTISTA
 var ArtistSchema = Schema({
 	name: String,
 	description: String,
 	image: String
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo
 /*EXPORTAMOS EL MODELO "Artista" Y EL SCHEMA "ArtistSchema"*/
 module.exports = mongoose.model('Artist',ArtistSchema)