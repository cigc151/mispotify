(function (){

	'use strict'

	var express = require('express');
	var bodyParser = require('body-Parser');
	var app = express();

	//cargar rutas
		var user_routes = require('./routes/user');
		var artist_routes = require('./routes/artist')
		var album_routes = require('./routes/album');
		var song_routes = require('./route/song');

		//configuramos bodyParser
		app.use(bodyParser.urlencoded({extended:false}));
		app.use(bodyParser.json());

	//configurar cabeceras http

	app.use((req, res, next) => {
	  res.header('Access-Control-Allow-Origin', '*') //Permite el acceso a la api
	  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
	  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	  next();
	});

	//carga de rutas base
	app.use('/api',user_routes);
	app.use('/api',artist_routes);
	app.use('/api',album_routes);
	app.use('/api',song_routes);

/*
	app.get('/pruebas',function(req,res){
		res.status(200).send({message:'Bienvenido al curso de Carlos Gonzalez'});
	});
	//exportando los modulos
*/ 
	module.exports = app;


})();