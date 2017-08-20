'use strict'
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var AlbumSchema = Schema({
 	title:String,
 	description:String,
 	year:Number,
 	image:String,
 	artist:{type:Schema.ObjectId, ref:'Artist'}//Referenciamos Album con artista
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo

 module.exports = mongoose.model('Artist',ArtistSchema)