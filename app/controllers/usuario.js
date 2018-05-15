module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    pessoaDao.listar(function(error, pessoas){
        grupoDao.listar(function(error, grupos){
            empresaDao.listar(function(error, empresas){
                usuarioDao.listar(function(error, usuarios){
           
                    connection.end();
           
                    if( error ) {
                        res.render('usuario', { validacao : [ {'msg': error }], usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                        return;
                    }
                    res.render('usuario', { validacao : {}, usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                });
            });
        });
    });
}

module.exports.excluir = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
	//}
    
    var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    pessoaDao.listar(function(error, pessoas){
        grupoDao.listar(function(error, grupos){
            empresaDao.listar(function(error, empresas){
                usuarioDao.listar(function(error, usuarios){
                    usuarioDao.excluir( req.params._id, function(error, pessoas){
                        if( error ) {
                            if(error.errno != undefined && error.errno == 1451) { 
                                
                                res.render('usuario', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: req.session.usuario });
                                connection.end();
                                
                            } else {                         
                                connection.end();
                    
                                if( error ) {
                                    res.render('usuario', { validacao : [ {'msg': error }], usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                                    return;
                                }
                                res.render('usuario', { validacao : {}, usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                                return;
                            }
                        }
                        res.redirect("/usuario");
                        
                    });
                });
            });
        });
    });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var grupoDao = new application.app.models.GrupoDAO(connection);
    var empresaDao = new application.app.models.EmpresaDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);

    pessoaDao.listar(function(error, pessoas){
        grupoDao.listar(function(error, grupos){
            empresaDao.listar(function(error, empresas){
                usuarioDao.listar(function(error, usuarios){
        
                    var dadosForms = req.body;
                    req.assert('empresa', 'Empresa é obrigatório').notEmpty();
                    req.assert('nome', 'Nome é obrigatório').notEmpty();
                    req.assert('senha', 'Senha é obrigatório').notEmpty();  
                    req.assert('grupo', 'Grupo é obrigatório').notEmpty();        
                    var erros = req.validationErrors();
                
                    if( erros ) {
                        res.render('usuario', { validacao : {}, usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                        return;
                    }

                    if(error){     
                        res.render('usuario', { validacao : {}, usuarios:usuarios, pessoas : pessoas, grupos: grupos, empresas:empresas, sessao: {} });
                        return;
                    }   
                    
                    usuarioDao.salvar(dadosForms, function(error, result){
                        
                        connection.end(); 
                        res.redirect('/usuario');
                    });
                });
            });
        });
    });      
}

