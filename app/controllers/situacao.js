module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);

    tipoDao.listar(function(error, tipos){
        situacaoDao.listar(function(error, situacoes){
            connection.end();
            if( error ) {
                res.render('situacao', { validacao : [ {'msg': error }], situacoes : {}, tipos:{}, sessao: {} });
                return;
            }
            res.render('situacao', { validacao : {}, situacoes : situacoes, tipos:tipos, sessao: {} });
        });
    });
}

module.exports.pegarFluxos = function( application, req, res ){
    var parametros = req.params;
    console.log(parametros)
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.listar(function(error, tipos){
    
        situacaoDao.editar( req.params._id, function(error, situacoes){
            connection.end();
            if( error ) {
                res.render('situacao', { validacao : [ {'msg': error }], situacoes : {}, sessao: {} });
                return;
            }
            res.render('situacao', { validacao : {}, situacoes : situacoes, sessao: req.session.usuario });
        });

    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.listar(function(error, tipos){
        situacaoDao.excluir( req.params._id, function(error, situacoes){
            if( error ) {
                if(error.errno != undefined && error.errno == 1451) { 
                    situacaoDao.listar(function(error, situacoes){                    
                        res.render('situacao', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], situacoes : situacoes, tipos:tipos, sessao: req.session.usuario });
                        connection.end();
                    });
                } else {                
                    res.render('situacao', { validacao : [ {'msg': error }], situacoes : {}, tipos:tipos, sessao: req.session.usuario });
                }
                return;
            }
            connection.end();
            res.redirect("/situacao");
        });
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('situacoeEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);
    
    tipoDao.listar(function(error, tipos){   
        situacaoDao.listar(function(error, situacoes){
            
            var dadosForms = req.body;
            req.assert('nome', 'Fantasia é obrigatório').notEmpty();       
            var erros = req.validationErrors();
        
            if( erros ) {
                res.render('situacao', {validacao: erros,  situacoes: situacoes, tipos:tipos, sessao: {}});
                return;
            }

            if(error){            
                res.render('situacao', {validacao: error,  situacoes: situacoes, tipos:tipos, sessao: {}});
                return;
            }   
            
            situacaoDao.salvar(dadosForms, function(error, result){
                connection.end(); 
                res.redirect('/situacao');
            });
        });      
    });
}

