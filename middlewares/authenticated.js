(function(){

	'use strict'

	var jwt =require('jwt-simple');
	var moment = require ('moment');
	var secret ='llave_secreta_curso';

	exports.ensureAuth =function(req,res,next){

		if(!req.headers.authorization){
			return res.status(403).send({message: 'La peticion no tiene la cabecera de autenctcacion'})
		}
		var token = req.headers.authorization.replace(/['"]+/g,'');

		try{
			var payload = jwt.decode(token,secret);
			if(payload.exp <= moment().unix()){
				return res.status(401).send({message:'Eltoken ha expirado'});
			}

		}
		catch(ex){
			console.log(ex)
			return res.status(403).send({message: 'Token no valido'})

		}
		req.user = payload;
		next();
	};

})();