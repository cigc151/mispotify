'use strict'
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var SongSchema = Schema({
 	number:Number,
 	name:String,
 	duration:String,
 	file:String,
 	album:{type:Schema.ObjectId, ref:'Album'}//Referenciamos song con album
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo

 module.exports = mongoose.model('Song',SongSchema)