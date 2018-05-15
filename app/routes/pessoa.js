module.exports = function(application){
    application.get('/novoPessoa', function(req, res){		
        application.app.controllers.pessoa.novo(application, req, res);
    });  

    application.post('/salvarPessoa', function(req, res){		
        application.app.controllers.pessoa.salvar(application, req, res);
    });  

    application.get('/editarPessoa/:_id', function(req, res){
        application.app.controllers.pessoa.editar(application, req, res);
    });

    application.get('/excluirPessoa/:_id', function(req, res){
        application.app.controllers.pessoa.excluir(application, req, res);
    });

}