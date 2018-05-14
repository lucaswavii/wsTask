module.exports = function(application){
    application.get('/novoEmpresa', function(req, res){		
        application.app.controllers.empresa.novo(application, req, res);
    });  

    application.post('/salvarEmpresa', function(req, res){		
        application.app.controllers.empresa.salvar(application, req, res);
    });  

    application.get('/editarEmpresa/:_id', function(req, res){
        application.app.controllers.empresa.editar(application, req, res);
    });

    application.get('/excluirEmpresa/:_id', function(req, res){
        application.app.controllers.empresa.excluir(application, req, res);
    });

}