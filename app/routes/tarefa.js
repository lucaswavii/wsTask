module.exports = function(application){
    application.get('/novoTarefa', function(req, res){		
        application.app.controllers.tarefa.novo(application, req, res);
    });  

    application.post('/salvarTarefa', function(req, res){		
        application.app.controllers.tarefa.salvar(application, req, res);
    });  

    application.get('/editarTarefa/:_id', function(req, res){
        application.app.controllers.tarefa.editar(application, req, res);
    });

    application.get('/excluirTarefa/:_id', function(req, res){
        application.app.controllers.tarefa.excluir(application, req, res);
    });

    application.post('/salvarEvento/:_id', function(req, res){
        application.app.controllers.tarefa.salvarEvento(application, req, res);
    });

}