module.exports = function(application){
    application.get('/novoFluxo', function(req, res){		
        application.app.controllers.fluxo.novo(application, req, res);
    });  

    application.post('/salvarFluxo', function(req, res){	
        application.app.controllers.fluxo.salvar(application, req, res);
    });  

    application.get('/editarFluxo/:_id', function(req, res){
        application.app.controllers.fluxo.editar(application, req, res);
    });

    application.get('/excluirFluxo/:_id', function(req, res){
        application.app.controllers.fluxo.excluir(application, req, res);
    });

}