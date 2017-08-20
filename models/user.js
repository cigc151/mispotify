'use strict'
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var UserSchema = Schema({
 	name: String,
 	surname: String,
 	email: String,
 	password: String,
 	role: String,
 	image: String
 });

 //para utilizar este objeto fuera del fichero usamos la siguiente linea de codigo

 module.exports = mongoose.model('User',UserSchema)