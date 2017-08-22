(function(){
	'use strict'
	var User=require('../models/user')
	var bcrypt = require('bcrypt-nodejs')
	var jwt =require ('../services/jwt');

	/*METODO DE PRUEBA PARA RESPUESTA DEL SERVIDOR*/
	function pruebas(req,res){

		res.status(200).send({message:'Probando una accion del controlador de usuarios del api rest con node y mongo'});
	}

	/*METODO PARA EL REGISTRO DE USUARIOS*/
	function saveUser(req,res){
		var user = new User();
		var params =req.body;

		//console.log(params);
		user.name=params.name;
		user.surname=params.surname;
		user.email=params.email;
		user.role='ROLE_USER';
		user.image='null';

		if(params.password){
			//encriptar contraseña y guardar datos
			bcrypt.hash(params.password,null,null,function(err,hash){
				user.password = hash;
				if(user.name != null && user.surname != null && user.email != null){

					//Guardar el usuario
					user.save((err,userStored)=>{
						if(err){
							res.status(500).send({message:'Error al guardar el usuario'});
						}
						else{
							if(!userStored){
								res.status(404).send({message:'No se ha registrado el usuario'});
							}
							else{
								res.status(200).send({user:userStored});
							}

						}
					});
				}
				else{
					res.status(200).send({message:'Rellena todos los campos'});
				}
			});
		}
		else{
			res.status(200).send({message:'Introduzca la contraseña'})
		}
	}

	/*METODO PARA LOGEAR USUARIOS*/
	function loginUser(req,res){
		var  params = req.body;
		var email = params.email;
		var password = params.password;

		User.findOne({email:email.toLowerCase()},(err,user)=>{
			if(err){
				res.status(500).send({message:'Error en la peticion'});
		    }

			else{
				if(!user){
					res.status(500).send({message:'El usuario no existe'});
				}
				else{
					//Comprobar la contraseña
					bcrypt.compare(password, user.password,function(err,check){
						if(check){
							//devolver los datos del usuario logueado
							if(params.gethash){
								//devolver un token de jwt
								res.status(200).send({
									token:jwt.createToken(user)
								});
							}
							else{
								/*REGRESAMOS LOS DATOS DEL USUARIO*/
								res.status(200).send({user});
							}
						}
						else{

							res.status(404).send({message:'El usuario no ha podido loguearse'});

						}
					});
				}

			}
		});
		//res.status(200).send({message:'Probando ruta de login' + email + " " +password});
	}

	/*EXPORTAMOS TODOS LOS METODOS EN ESTA SECCION*/
	module.exports={
		pruebas,
		saveUser,
		loginUser
	}
})();
