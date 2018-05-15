module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var tipoDao = new application.app.models.TipoDAO(connection);   
    tipoDao.listar(function(error, tipos){

    
        pessoaDao.listar(function(error, pessoas){
            connection.end();
            if( error ) {
                res.render('pessoa', { validacao : [ {'msg': error }], pessoas : {}, tipos: {}, sessao: {} });
                return;
            }
            res.render('pessoa', { validacao : {}, pessoas : pessoas, tipos: tipos, sessao: {} });
        });

    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    
    pessoaDao.editar( req.params._id, function(error, pessoas){
        connection.end();
        if( error ) {
            res.render('pessoa', { validacao : [ {'msg': error }], pessoas : {}, sessao: {} });
            return;
        }
        res.render('pessoaEditar', { validacao : {}, pessoas : pessoas, sessao: req.session.usuario });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    
    pessoaDao.excluir( req.params._id, function(error, pessoas){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                pessoaDao.listar(function(error, pessoas){                    
                    res.render('pessoa', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], pessoas : pessoas, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('pessoa', { validacao : [ {'msg': error }], pessoas : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/pessoa");
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
    //}
    
    
	res.render('pessoaEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);   
    var tipoDao = new application.app.models.TipoDAO(connection);   
    pessoaDao.listar(function(error, pessoas){
     
        tipoDao.listar(function(error, tipos){
        
            var dadosForms = req.body;
            req.assert('cpf', 'Cpf é obrigatório').notEmpty();
            req.assert('nome', 'Nome é obrigatório').notEmpty();       
            var erros = req.validationErrors();
        
            if( erros ) {
                console.log(erros)
                res.render('pessoa', {validacao: erros,  pessoas: pessoas, tipos:tipos, sessao: {}});
                return;
            }

            if(error){     
                console.log(error)       
                res.render('pessoa', {validacao: error,  pessoas: pessoas, tipos:tipos, sessao: {}});
                return;
            }   
            
            pessoaDao.salvar(dadosForms, function(error, result){
                console.log(error)   
                connection.end(); 
                res.redirect('/pessoa');
            });
        });
    });      
}

