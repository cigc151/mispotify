'use strict'
/*IMPORTAMOS EL MODULO DE MONGOOSE*/
 var mongoose = require('mongoose');
/*UTILIZAMOS SCHEMAS DE MONGOOSE*/

 var Schema = mongoose.Schema;

//DEFINIMOS ATRIBUTOS DEL SCHEMA DE USER
 var UserSchema = Schema({
 	name: String,
 	surname: String,
 	email: String,
 	password: String,
 	role: String,
 	image: String
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo
 /*EXPORTAMOS EL MODELO "User" Y EL SCHEMA "UsertSchema"*/
 module.exports = mongoose.model('User',UserSchema)