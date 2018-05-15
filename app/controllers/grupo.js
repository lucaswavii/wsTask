module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.listar(function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupo', { validacao : [ {'msg': error }], grupos : {}, sessao: {} });
            return;
        }
        res.render('grupo', { validacao : {}, grupos : grupos, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.editar( req.params._id, function(error, grupos){
        connection.end();
        if( error ) {
            res.render('grupo', { validacao : [ {'msg': error }], grupos : {}, sessao: {} });
            return;
        }
        res.render('grupo', { validacao : {}, grupos : grupos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.excluir( req.params._id, function(error, grupos){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                grupoDao.listar(function(error, grupos){                    
                    res.render('grupo', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], grupos : grupos, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('grupo', { validacao : [ {'msg': error }], grupos : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/grupo");
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('grupoEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);   
    grupoDao.listar(function(error, grupos){
        
        var dadosForms = req.body;
        req.assert('nome', 'Fantasia é obrigatório').notEmpty();       
        var erros = req.validationErrors();
    
        if( erros ) {
            res.render('grupo', {validacao: erros,  grupos: grupos, sessao: {}});
            return;
        }

        if(error){            
            res.render('grupo', {validacao: error,  grupos: grupos, sessao: {}});
            return;
        }   
        
        grupoDao.salvar(dadosForms, function(error, result){
            connection.end(); 
            res.redirect('/grupo');
        });
    });      
}

