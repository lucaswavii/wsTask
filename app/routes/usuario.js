module.exports = function(application){
    application.get('/novoUsuario', function(req, res){		
        application.app.controllers.usuario.novo(application, req, res);
    });  

    application.post('/salvarUsuario', function(req, res){		
        application.app.controllers.usuario.salvar(application, req, res);
    });  

    application.get('/editarUsuario/:_id', function(req, res){
        application.app.controllers.usuario.editar(application, req, res);
    });

    application.get('/excluirUsuario/:_id', function(req, res){
        application.app.controllers.usuario.excluir(application, req, res);
    });

}