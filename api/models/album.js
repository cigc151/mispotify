'use strict'
/*IMPORTAMOS EL MODULO DE MONGOOSE*/
 var mongoose = require('mongoose');
 /*CREAMOS SCHEMA*/
 var Schema = mongoose.Schema;

/*DEFINIMOS ATRIBUTOS DEL ESQUEMA ALBUM*/
 var AlbumSchema = Schema({
 	title:String,
 	description:String,
 	year:Number,
 	image:String,
 	artist:{type:Schema.ObjectId, ref:'Artist'}//Referenciamos Album con artista
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo
 /*EXPORTAMOS EL MODELO "Album" Y EL SCHEMA "AlbumSchema"*/
 module.exports = mongoose.model('Album',AlbumSchema)