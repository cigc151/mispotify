
(function(){
	'use strict'

	var express = require('express');
	var AlbumController = require('../controllers/album');

	//Librería para utilizar los métodos http
	var api = express.Router();

	//Middleware de autenticación
	var md_auth = require('../middlewares/authenticated');

	//Multi-party para manejar archivos con el protocolo http
	var multipart = require('connect-multiparty');
	var md_upload = multipart({uploadDir: './uploads/albums'});

	//Ruta para obtener un album de la base de datos
	api.get('/album/:id',md_auth.ensureAuth, AlbumController.getAlbum);

	//Guardar album
	api.post('/album',md_auth.ensureAuth, AlbumController.saveAlbum);

	//Ruta para obtener los albums de un artista de la base de datos (La variable artist es opcional)
	api.get('/albums/:artist?',md_auth.ensureAuth, AlbumController.getAlbums);

	//Ruta para actualizar un album
	api.put('/album/:id',md_auth.ensureAuth, AlbumController.updateAlbum);

	//Ruta para eliminar un album
	api.delete('/album/:id',md_auth.ensureAuth, AlbumController.deleteAlbum);

	//Ruta para subir imágen del artista
	api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload],AlbumController.uploadImage);

	//RUTA PARA OBTENER LA IMÁGEN DEL USUARIO (UTILIZA GET)
	api.get('/get-image-album/:imageFile', AlbumController.getImageFile);

	//Exportamos la api
	module.exports = api;

})();
