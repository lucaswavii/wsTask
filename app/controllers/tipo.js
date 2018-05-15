module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.listar(function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tipo', { validacao : [ {'msg': error }], tipos : {}, sessao: {} });
            return;
        }
        res.render('tipo', { validacao : {}, tipos : tipos, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.editar( req.params._id, function(error, tipos){
        connection.end();
        if( error ) {
            res.render('tipo', { validacao : [ {'msg': error }], tipos : {}, sessao: {} });
            return;
        }
        res.render('tipo', { validacao : {}, tipos : tipos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.excluir( req.params._id, function(error, tipos){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                tipoDao.listar(function(error, tipos){                    
                    res.render('tipo', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], tipos : tipos, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('tipo', { validacao : [ {'msg': error }], tipos : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/tipo");
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('tipoEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var tipoDao = new application.app.models.TipoDAO(connection);   
    tipoDao.listar(function(error, tipos){
        
        var dadosForms = req.body;
        req.assert('nome', 'Fantasia é obrigatório').notEmpty();       
        var erros = req.validationErrors();
    
        if( erros ) {
            res.render('tipo', {validacao: erros,  tipos: tipos, sessao: {}});
            return;
        }

        if(error){            
            res.render('tipo', {validacao: error,  tipos: tipos, sessao: {}});
            return;
        }   
        
        tipoDao.salvar(dadosForms, function(error, result){
            connection.end(); 
            res.redirect('/tipo');
        });
    });      
}

