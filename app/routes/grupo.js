module.exports = function(application){
    application.get('/novoGrupo', function(req, res){		
        application.app.controllers.grupo.novo(application, req, res);
    });  

    application.post('/salvarGrupo', function(req, res){		
        application.app.controllers.grupo.salvar(application, req, res);
    });  

    application.get('/editarGrupo/:_id', function(req, res){
        application.app.controllers.grupo.editar(application, req, res);
    });

    application.get('/excluirGrupo/:_id', function(req, res){
        application.app.controllers.grupo.excluir(application, req, res);
    });

}