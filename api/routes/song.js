(function(){
	
	'use strict'

	var express = require('express');
	var SongController = require('../controllers/song');

	//Librería para utilizar los métodos http
	var api = express.Router();

	//Middleware de autenticación
	var md_auth = require('../middlewares/authenticated');

	//Multi-party para manejar archivos con el protocolo http
	var multipart = require('connect-multiparty');
	var md_upload = multipart({uploadDir: './uploads/songs'});

	//Ruta para obtener una canción de la base de datos
	api.get('/song/:id',md_auth.ensureAuth, SongController.getSong);

	//Ruta para guardar una cancion
	api.post('/song',md_auth.ensureAuth, SongController.saveSong);

	//Ruta para listar las canciones
	api.get('/songs/:album?',md_auth.ensureAuth, SongController.getSongs);

	//Ruta para actualizar una cancion
	api.put('/song/:id',md_auth.ensureAuth, SongController.updateSong);

	//Ruta para eliminar una cancion
	api.delete('/song/:id',md_auth.ensureAuth, SongController.deleteSong);

	//Ruta para subir el archivo de la cancion
	api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile);

	//RUTA PARA OBTENER EL ARCHIVO DE LA CANCION
	api.get('/get-song-file/:songFile', SongController.getSongFile);

	//Exportamos la api
	module.exports = api;
})();