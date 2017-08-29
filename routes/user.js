
(function(){
	'use strict'

	var express = require('express')
	var UserController =require('../controllers/user');


	var api = express.Router();
	var md_auth = require('../middlewares/authenticated');


	var multipart = require('connect-multiparty'); 
	var md_upload = multipart({uploadDir:'./uploads/users'})
	/*RUTA DEL CONTROLADOR DE PRUEBA*/
	api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
	/*RUTA DE CONTROLADOR REGISTRO DE USUARIO*/
	api.post('/register',UserController.saveUser);
	/*RUTA DE CONTROLADOR DE LOGIN*/
	api.post('/login',UserController.loginUser);
	/*RUTA  DE CONTROLADOR DE UPDATE USER*/
	api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
	/*RUTA DE CONTROLADOR USER UPLOAD IMAGE*/
	api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
	/*RUTA DE CONTROLADO DE GET IMAGE*/
	api.get('/get-image-user/:imageFile',UserController.getImageFile);

	module.exports=api;
})();
