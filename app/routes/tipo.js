module.exports = function(application){
    application.get('/novoTipo', function(req, res){		
        application.app.controllers.tipo.novo(application, req, res);
    });  

    application.post('/salvarTipo', function(req, res){		
        application.app.controllers.tipo.salvar(application, req, res);
    });  

    application.get('/editarTipo/:_id', function(req, res){
        application.app.controllers.tipo.editar(application, req, res);
    });

    application.get('/excluirTipo/:_id', function(req, res){
        application.app.controllers.tipo.excluir(application, req, res);
    });

}