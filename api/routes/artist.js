
(function(){
	'use strict'

	var express = require('express')
	var ArtistController =require('../controllers/artist');


	var api = express.Router();
	var md_auth = require('../middlewares/authenticated');

//md_auth.ensureAuth,

	/*RUTA DEL CONTROLADOR DE GET ARTISTA*/
	api.get('/artist/:id',md_auth.ensureAuth,ArtistController.getArtist);
	/*RUTA DEL CONTROLADOR aGREGAR ARTISTA*/
	api.post('/artist',md_auth.ensureAuth,ArtistController.saveArtist);
	/*RUTA PARA OBTERNER PAGINACION DE ARTISTAS*/
	api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
	/*RUTA PARA ACTUALIZAR ARTISTA*/
	api.put('/artists/:id',md_auth.ensureAuth,ArtistController.updateArtist);
	/*RUTA PARA ACTUALIZAR ARTISTA*/
	api.delete('/artists/:id',md_auth.ensureAuth,ArtistController.deleteArtist);



	module.exports=api;
})();
