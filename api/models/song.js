'use strict'
/*IMPORTAMOS EL MODULO DE MONGOOSE*/
 var mongoose = require('mongoose');

 /*UTILIZAMOS SCHEMAS DE MONGOOSE*/
 var Schema = mongoose.Schema;

//DEFINIMOS ATRIBUTOS DEL SCHEMA DE SONG
 var SongSchema = Schema({
 	number:Number,
 	name:String,
 	duration:String,
 	file:String,
 	album:{type:Schema.ObjectId, ref:'Album'}//Referenciamos song con album
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo
 /*EXPORTAMOS EL MODELO "Song" Y EL SCHEMA "SongSchema"*/
 module.exports = mongoose.model('Song',SongSchema)