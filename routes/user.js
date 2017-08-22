'use strict'

var express = require('express')
var UserController =require('../controllers/user');

var api = express.Router();
/*RUTA DEL CONTROLADOR DE PRUEBA*/
api.get('/probando-controlador',UserController.pruebas);
/*RUTA DE CONTROLADOR REGISTRO DE USUARIO*/
api.post('/register',UserController.saveUser);

module.exports=api;