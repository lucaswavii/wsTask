module.exports.index = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	var connection = application.config.dbConnection();
    var tarefaDao = new application.app.models.TarefaDAO(connection);
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var nivelDao = new application.app.models.NivelDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    tarefaDao.listar(function(error, tarefas){
        pessoaDao.listar(function(error, pessoas){
            fluxoDao.listar(function(error, fluxos){
                situacaoDao.listar(function(error, situacoes){
                    nivelDao.listar(function(error, niveis){
                        usuarioDao.listar(function(error, usuarios){
                            connection.end();
                            if( error ) {
                                res.render('tarefa', { validacao : [ {'msg': error }], tarefas : tarefas, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {} });
                                return;
                            }
                            res.render('tarefa', { validacao : {}, tarefas : tarefas, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {} });
                        });
                    });
                });
            });
        });
        
    });
}

module.exports.editar = function( application, req, res ){
    
    //if( req.session.usuario == undefined ) {
	//	res.redirect("/login")			
    //}
    
    var connection = application.config.dbConnection();
    var tarefaDao = new application.app.models.TarefaDAO(connection);
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var nivelDao = new application.app.models.NivelDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);

    tarefaDao.editar( req.params._id, function(error, tarefas){
        pessoaDao.listar(function(error, pessoas){
            fluxoDao.listar(function(error, fluxos){
                fluxoDao.pegarFluxos(  tarefas[0].fluxo, tarefas[0].situacao , function(error, fluxo){
                    situacaoDao.listar(function(error, situacoes){
                        nivelDao.listar(function(error, niveis){
                            usuarioDao.listar(function(error, usuarios){
                                console.log(tarefas)
                                connection.end();
                                if( error ) {
                                    res.render('evento', { validacao : [ {'msg': error }], tarefas : tarefas, fluxo:fluxo, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {} });
                                    return;
                                }
                                res.render('evento', { validacao : {}, tarefas : tarefas, fluxo:fluxo, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {} });
                            });
                        });
                    });
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
    var tarefaDao = new application.app.models.TarefaDAO(connection);
    
    tarefaDao.excluir( req.params._id, function(error, tarefas){
        if( error ) {
            if(error.errno != undefined && error.errno == 1451) { 
                tarefaDao.listar(function(error, tarefas){                    
                    res.render('tarefa', { validacao : [ {'msg': "Não se pode excluir dados com vínculos em outras tabelas." }], tarefas : tarefas, sessao: req.session.usuario });
                    connection.end();
                });
            } else {                
                res.render('tarefa', { validacao : [ {'msg': error }], tarefas : {}, sessao: req.session.usuario });
            }
            return;
        }
        connection.end();
        res.redirect("/tarefa");
    });
}


module.exports.novo = function(application, req, res){
	
	//if( req.session.usuario == undefined ) {
	//	res.redirect("login")			
	//}

	res.render('tarefaEditar', { validacoes: {}, sessao: {} });
}

module.exports.salvar = function( application, req, res ){

    var connection = application.config.dbConnection();
    var tarefaDao = new application.app.models.TarefaDAO(connection);
    var pessoaDao = new application.app.models.PessoaDAO(connection);
    var fluxoDao = new application.app.models.FluxoDAO(connection);
    var situacaoDao = new application.app.models.SituacaoDAO(connection);
    var nivelDao = new application.app.models.NivelDAO(connection);
    var usuarioDao = new application.app.models.UsuarioDAO(connection);
    
    tarefaDao.listar(function(error, tarefas){
        pessoaDao.listar(function(error, pessoas){
            fluxoDao.listar(function(error, fluxos){
                situacaoDao.listar(function(error, situacoes){
                    nivelDao.listar(function(error, niveis){
                        usuarioDao.listar(function(error, usuarios){
                            
                            var dadosForms = req.body;
                            req.assert('titulo', 'Título é obrigatório').notEmpty();       
                            var erros = req.validationErrors();
                        
                            if( erros ) {
                                connection.end(); 
                                res.render('tarefa', {validacao: erros, tarefas : tarefas, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {}});
                                return;
                            }

                            if(error){    
                                connection.end();         
                                res.render('tarefa', {validacao: error,  tarefas : tarefas, pessoas: pessoas, fluxos:fluxos, situacoes:situacoes, niveis:niveis, usuarios: usuarios, sessao: {}});
                                return;
                            }   
                            
                            tarefaDao.salvar(dadosForms, function(error, result){
                                connection.end(); 
                                res.redirect('/tarefa');
                            });
                        });
                    });
                });
            });
        });
        
    });
          
}

