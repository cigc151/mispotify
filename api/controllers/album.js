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

//Obtener un album de la base de datos
function getAlbum(req, res){
  var albumId = req.params.id;

  //Populate carga los datos del objeto artista al que pertenece el id almacenado en el documento del album
  Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }
    else{
      if(!album){
        res.status(404).send({message: 'EL album no existe'});
      }
      else{
        res.status(200).send({album});
      }
    }
  });
}

//Guardar ablum
function saveAlbum(req, res){
  var album = new Album();
  var params = req.body;
  album.title = params.title;
  album.description = params.description;
  album.year = params.year;
  album.image = 'null';
  album.artist = params.artist;

  album.save((err, albumStored) => {
    if(err){
      res.status(500).send({message: "Error en el servidor"});
    }
    else{
      if(!albumStored){
        res.status(404).send({message: "No se ha guardado el album"});
      }
      else{
        res.status(200).send({album: albumStored});
      }
    }
  });
}

//Obtener todos los albums de un artista
function getAlbums(req, res){
  var artistId = req.params.artist;

  if(!artistId){
    //Sacar todos los albums de la base de datos
    var find = Album.find({}).sort('title');
  }
  else{
    //Sacar los albums de un artista concreto de la base de datos
    var find = Album.find({artist: artistId}).sort('year');
  }

  //Inserta los datos del artista en cada documento de los albums
  find.populate({path: 'artist'}).exec((err, albums) =>{
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!albums){
        res.status(404).send({message: "No hay albums"});
      }
      else{
        res.status(200).send({albums});
      }
    }
  });
}

//Actualizar un album
function updateAlbum(req, res){
  var albumId = req.params.id;
  var update = req.body;

  Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
    if(err){
      res.status(500).send({message: "Error en la petición"});
    }
    else{
      if(!albumUpdated){
        res.status(404).send({message: "EL album no existe"});
      }
      else{
        //Devuelve los datos del objeto antetior
        res.status(200).send({album: albumUpdated});
      }
    }
  });
}

//Eliminar un album
function deleteAlbum(req, res){
  var albumId = req.params.id;
  //Se elimina el alum y las canciones asociadas a él
  Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
    if(err){
      res.status(500).send({message: 'Error al eliminar el album'});
    }
    else {
      if(!albumRemoved){
        res.status(404).send({message: 'El album no ha sido eliminado'});
      }
      else {
        Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
          if(err){
            res.status(500).send({message: 'Error al eliminar la canción'});
          }
          else {
            if(!songRemoved){
              res.status(404).send({message: 'La canción no ha sido eliminada'});
            }
            else {
              res.status(200).send({album: albumRemoved});
            }
          }
        });
        }
      }
  });
}

//Subir imágen del album
function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name = 'No subido...';

	if(req.files)
	{
		var file_path = req.files.image.path;

		//Obteniendo el nombre del archivo
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		//Obteniendo la extensión del archivo
		var ext_split  = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' ||  file_ext == 'gif')
		{
			Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
				if(err){
					res.status(500).send({message: 'Error al actualizar el album'});
				}
				else
				{
					if(!albumUpdated){
						res.status(404).send({message: 'No se ha podido actualizar el album'});
					}
					else
					{
						//Muestra los datos del usuario antes de ser actualizado
						res.status(200).send({album: albumUpdated});
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
		res.status(200).send({message: 'No has subido ninguna imágen'});
	}
}

/////////////////////// MÉTODO PARA OBTENER LA IMAGEN DEL ALBUM ///////////////////////////

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/albums/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}
		else
		{
			res.status(200).send({message: 'No existe la imágen'});
		}
	});
}

module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
}

})();