(function(){

	'use strict'

	//Librerías para utilizar el sistema de archivos
	var path = require('path');
	var fs = require('fs');

	//Importar los modelos
	var Artist = require('../models/artist');
	var Album = require('../models/album');
	var Song = require('../models/song');

	//Modulo de paginación
	var mongoosePaginate = require('mongoose-pagination');

	//Obtener una canción
	function getSong(req, res){
	  var songId = req.params.id;

	  //Obtiene los datos del album a la que está asociada
	  Song.findById(songId).populate({path: 'album'}).exec((err, song) =>{
	    if(err){
	        res.status(500).send({message: 'Error en la petición'});
	    }
	    else{
	      if(!song){
	          res.status(404).send({message: 'La canción no existe'});
	      }
	      else{
	          res.status(200).send({song});
	      }
	    }
	  });
	}

	//Guardar canción
	function saveSong(req, res){
	  var song = new Song();

	  var params = req.body;
	  song.number = params.number;
	  song.name = params.name;
	  song.duration = params.duration;
	  song.file = null;
	  song.album = params.album;

	  song.save((err, songStored) => {
	    if(err){
	      res.status(500).send({message: 'Error en el servidor'});
	    }
	    else{
	      if(!songStored){
	        res.status(404).send({message: 'No se ha guardado la cancion'});
	      }
	      else{
	        res.status(200).send({song: songStored});
	      }
	    }
	  });
	}

	//Listar canciones
	function getSongs(req, res){
	  var albumId = req.params.album;

	  //Si no llega el id del album
	  if(!albumId){
	    var find = Song.find({}).sort('number');
	  }
	  else{
	    var find = Song.find({album: albumId}).sort('number');
	  }

	  //Obtiene la información del album y del artista
	  find.populate({
	    path: 'album',
	    populate:{  //Obtiene la información del artista del id almacenado en el documento del album
	      path: 'artist',
	      model: 'Artist' //Se envía la información el artista
	    }
	  }).exec((err, songs) => {
	    if(err){
	      res.status(500).send({message: 'Error en el servidor'});
	    }
	    else{
	      if(!songs){
	        res.status(404).send({message: 'No hay canciones'});
	      }
	      else{
	        res.status(200).send({songs});
	      }
	    }
	  });
	}

	//Actualizar cancion
	function updateSong(req, res){
	  var songId = req.params.id;
	  var update = req.body;

	  Song.findByIdAndUpdate(songId, update, (err, songUpdated) =>{
	    if(err){
	      res.status(500).send({message: 'Error en el servidor'});
	    }
	    else{
	      if(!songUpdated){
	        res.status(404).send({message: 'No se ha actualizado la cancion'});
	      }
	      else{
	        res.status(200).send({songUpdated});
	      }
	    }
	  });
	}

	//Eliminar una cancion
	function deleteSong(req, res){
	    var songId = req.params.id;
	    Song.findByIdAndRemove(songId, (err, songRemoved) => {
	      if(err){
	        res.status(500).send({message: 'Error en el servidor'});
	      }
	      else{
	        if(!songRemoved){
	          res.status(404).send({message: 'No se ha borrado la cancion'});
	        }
	        else{
	          res.status(200).send({songRemoved});
	        }
	      }
	    });
	}

	//Subir el archivo de audio de la cancion
	function uploadFile(req, res){
		var songId = req.params.id;
		var file_name = 'No subido...';

		if(req.files)
		{
			var file_path = req.files.file.path;

			//Obteniendo el nombre del archivo
			var file_split = file_path.split('\\');
			var file_name = file_split[2];

			//Obteniendo la extensión del archivo
			var ext_split  = file_name.split('\.');
			var file_ext = ext_split[1];

			if(file_ext == 'mp3' || file_ext == 'ogg')
			{
				Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
					if(err){
						res.status(500).send({message: 'Error al actualizar la cancion'});
					}
					else
					{
						if(!songUpdated){
							res.status(404).send({message: 'No se ha podido actualizar la cancion'});
						}
						else
						{
							//Muestra los datos del usuario antes de ser actualizado
							res.status(200).send({song: songUpdated});
						}
					}
				});
			}

			else
			{
				res.status(200).send({message: 'Extensión del archivo no válida'});
			}

			console.log(ext_split);
		}
		else
		{
			res.status(200).send({message: 'No has subido ningun archivo'});
		}
	}

	/////////////////////// MÉTODO PARA OBTENER EL ARCHIVO DE LA CANCION ///////////////////////////

	function getSongFile(req, res){
		var songFile = req.params.songFile;
		var path_file = './uploads/songs/'+songFile;
		fs.exists(path_file, function(exists){
			if(exists){
				res.sendFile(path.resolve(path_file));
			}
			else
			{
				res.status(200).send({message: 'No existe fichero de audio'});
			}
		});
	}
	module.exports = {
	  getSong,
	  getSongs,
	  saveSong,
	  updateSong,
	  deleteSong,
	  uploadFile,
	  getSongFile
	}

})();