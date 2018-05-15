module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var nivelDao = new application.app.models.NivelDAO(connection);
    
    nivelDao.listar(function(error, niveis){
        connection.end();
        if( error ) {
            res.render('nivel', { validacao : [ {'msg': error }], niveis : {}, sessao: {} });
            return;
        }
        res.render('nivel', { validacao : {}, niveis : niveis, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var nivelDao = new application.app.models.NivelDAO(connection);
    
    nivelDao.editar( req.params._id, function(error, niveis){
        connection.end();
        if( error ) {
            res.render('nivel', { validacao : [ {'msg': error }], niveis : {}, sessao: {} });
            return;
        }
        res.render('nivel', { validacao : {}, niveis : niveis, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var nivelDao = new application.app.models.NivelDAO(connection);
    
    nivelDao.excluir( req.params._id, function(error, niveis){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                nivelDao.listar(function(error, niveis){                    
                    res.render('nivel', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], niveis : niveis, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('nivel', { validacao : [ {'msg': error }], niveis : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/nivel");
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('nivelEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var nivelDao = new application.app.models.NivelDAO(connection);   
    nivelDao.listar(function(error, niveis){
        
        var dadosForms = req.body;
        req.assert('nome', 'Fantasia é obrigatório').notEmpty();       
        var erros = req.validationErrors();
    
        if( erros ) {
            res.render('nivel', {validacao: erros,  niveis: niveis, sessao: {}});
            return;
        }

        if(error){            
            res.render('nivel', {validacao: error,  niveis: niveis, sessao: {}});
            return;
        }   
        
        nivelDao.salvar(dadosForms, function(error, result){
            connection.end(); 
            res.redirect('/nivel');
        });
    });      
}

