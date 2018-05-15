module.exports = function(application){
    application.get('/novoNivel', function(req, res){		
        application.app.controllers.nivel.novo(application, req, res);
    });  

    application.post('/salvarNivel', function(req, res){		
        application.app.controllers.nivel.salvar(application, req, res);
    });  

    application.get('/editarNivel/:_id', function(req, res){
        application.app.controllers.nivel.editar(application, req, res);
    });

    application.get('/excluirNivel/:_id', function(req, res){
        application.app.controllers.nivel.excluir(application, req, res);
    });

}