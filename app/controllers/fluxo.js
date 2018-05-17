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
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    situacaoDao.listar(function(error, situacoes ){
        fluxoDao.editar( req.params._id, function(error, fluxos){
            fluxoDao.listarFluxos(function(error, listaFluxos){
                connection.end();
                if( error ) {
                    res.render('fluxos', { validacao : [ {'msg': error }], fluxos : {}, situacoes: {}, listaFluxos: listaFluxos, sessao: {} });
                    return;
                }
                res.render('fluxos', { validacao : {}, fluxos : fluxos, situacoes: situacoes, listaFluxos: listaFluxos, sessao: req.session.usuario });
        
            });
        });
    });
}
module.exports.excluirFluxos = function( application, req, res ){
 
    var connection = application.config.dbConnection();
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    fluxoDao.excluirFluxos( req.params._id, function(error, fluxos){
        res.redirect('/editarFluxo/' + fluxo.fluxo );
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

module.exports.salvarFluxos = function( application, req, res ){
    var connection = application.config.dbConnection();
    var fluxoDao = new application.app.models.FluxoDAO(connection); 
    
    fluxoDao.listar(function(error, fluxos){
        var dadosForms = req.body;
        
        if( dadosForms.situacoes.length > 1 ) {
            var predecessoras = dadosForms.situacoes.join(',');
            dadosForms.situacoes = predecessoras;
        }

     
        fluxoDao.salvarFluxos(dadosForms, function(error, result){
            console.log(error)
            connection.end(); 
            res.redirect('/editarFluxo/' + dadosForms.fluxo );
        });   
    });
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

