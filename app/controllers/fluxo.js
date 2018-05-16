module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    
    fluxoDao.listar(function(error, fluxos){
        connection.end();
        if( error ) {
            res.render('fluxo', { validacao : [ {'msg': error }], fluxos : {}, sessao: {} });
            return;
        }
        res.render('fluxo', { validacao : {}, fluxos : fluxos, sessao: {} });
    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.editar( req.params._id, function(error, fluxos){
        connection.end();
        if( error ) {
            res.render('grupo', { validacao : [ {'msg': error }], fluxos : {}, sessao: {} });
            return;
        }
        res.render('grupo', { validacao : {}, fluxos : fluxos, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var grupoDao = new application.app.models.GrupoDAO(connection);
    
    grupoDao.excluir( req.params._id, function(error, fluxos){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                grupoDao.listar(function(error, fluxos){                    
                    res.render('grupo', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], fluxos : fluxos, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('grupo', { validacao : [ {'msg': error }], fluxos : {}, sessao: req.session.usuario });
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
    var fluxoDao = new application.app.models.FluxoDAO(connection);   
    fluxoDao.listar(function(error, fluxos){
        
        var dadosForms = req.body;
        req.assert('nome', 'Fantasia é obrigatório').notEmpty();  
        req.assert('inicio', 'Data Início é obrigatório').notEmpty();       
        var erros = req.validationErrors();

        if( !dadosForms.fim ) {
            dadosForms.fim = null;
        }
    
        if( erros ) {
            console.log(erros)
            res.render('fluxo', {validacao: erros,  fluxos: fluxos, sessao: {}});
            return;
        }

        if(error){   
            console.log(error)         
            res.render('fluxo', {validacao: error,  fluxos: fluxos, sessao: {}});
            return;
        }   
        
        fluxoDao.salvar(dadosForms, function(error, result){
            console.log(error)
            connection.end(); 
            res.redirect('/fluxo');
        });
    });      
}

