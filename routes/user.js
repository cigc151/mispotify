
(function(){
	'use strict'

	var express = require('express')
	var UserController =require('../controllers/user');


	var api = express.Router();
	var md_auth = require('../middlewares/authenticated');

	/*RUTA DEL CONTROLADOR DE PRUEBA*/
	api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
	/*RUTA DE CONTROLADOR REGISTRO DE USUARIO*/
	api.post('/register',UserController.saveUser);
	/*RUTA DE CONTROLADOR DE LOGIN*/
	api.post('/login',UserController.loginUser);

	module.exports=api;
})();
