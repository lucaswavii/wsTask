module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('index', { validacoes: {}, sessao: {} });
}