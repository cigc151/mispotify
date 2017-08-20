(function (){

	'use strict'
	var express = require('express');
	var bodyParser = require('body-Parser');
	var app = express();

	//cargar rutas
		var user_routes = require('./routes/user');

		//configuramos bodyParser
		app.use(bodyParser.urlencoded({extended:false}));
		app.use(bodyParser.json());

	//configurar cabeceras http


	//carga de rutas base
	app.use('/api',user_routes);
/*
	app.get('/pruebas',function(req,res){
		res.status(200).send({message:'Bienvenido al curso de Carlos Gonzalez'});
	});
	//exportando los modulos
*/ 
	module.exports = app;


})();
