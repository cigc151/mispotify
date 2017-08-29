(function(){
	'use strict'

	var path = require('path');
	var fs = require('fs');


	var Artist = require('../models/artist');
	var Song = require('../models/song');
	var Album = require('../models/album');

	var mongoosePaginate = require('mongoose-pagination') ;
	/*Metodo que obtiene un artista existente dentro de la BD*/
	function getArtist(req,res){
		var artistId = req.params.id;
		Artist.findById(artistId,(err,artist)=>{
			if(err){
				res.status(500).send({message:'Error en la peticion ...'})
			}
			else{
				if(!artist){
					res.status(404).send({message:'El artista no existe ...'})

				}
				else{
					res.status(200).send({artist});
				}
			}
		
		});
		//res.status(200).send({message:'Metodo getArtist del controlador artist.js'})
	}
	/*Metodo que guarda un nuev artista*/
	function saveArtist(req,res){
		var artist = new Artist();
		var params = req.body;

		artist.name = params.name;
		artist.description = params.description;
		artist.image = 'null';

		artist.save((err,artisStored)=>{

			if(err){
				res.status(500).send({message:'Error al guardar el artista'});
			}
			else{
				if(!artisStored){
					res.status(404).send({message:'El artista no ha sido guardado.'});
				}
				else{
					res.status(200).send({artist:artisStored});

				}
			}
		});

	}

	/*Metodo para listar artistas paginados*/
	function getArtists(req,res){

		if(req.params.page){
			var page = req.params.page;
		}
		else{
			var page = 1;

		}

		var itemsPerPage = 3;

		Artist.find().sort('name').paginate(page,itemsPerPage,function(err,artists,total){
			if(err){
				res.status(500).send({message:'Error en la peticion ... '});
			}
			else{
				if(!artists){
					res.status(404).send({message:'No hay artistas ... '});

				}
				else{
					return res.status(200).send({
						total_items:total,
						artists:artists
					});
				}
			}
		});
	}

	module.exports={
		getArtist,
		saveArtist,
		getArtists
	};

})();