module.exports = function(application){
    application.get('/novoSituacao', function(req, res){		
        application.app.controllers.situacao.novo(application, req, res);
    });  

    application.post('/salvarSituacao', function(req, res){		
        application.app.controllers.situacao.salvar(application, req, res);
    });  

    application.get('/editarSituacao/:_id', function(req, res){
        application.app.controllers.situacao.editar(application, req, res);
    });

    application.get('/excluirSituacao/:_id', function(req, res){
        application.app.controllers.situacao.excluir(application, req, res);
    });

}