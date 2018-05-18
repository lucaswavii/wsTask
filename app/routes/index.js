module.exports = function(application){
    application.get('/', function(req, res){
        application.app.controllers.index.index(application, req, res);
    });
  
    application.get('/index', function(req, res){		
        application.app.controllers.index.index(application, req, res);
    });  

    application.get('/empresa', function(req, res){		
        application.app.controllers.empresa.index(application, req, res);
    });  

    application.get('/tipo', function(req, res){		
        application.app.controllers.tipo.index(application, req, res);
    });  
    application.get('/grupo', function(req, res){		
        application.app.controllers.grupo.index(application, req, res);
    }); 
    
    application.get('/pessoa', function(req, res){		
        application.app.controllers.pessoa.index(application, req, res);
    }); 

    application.get('/usuario', function(req, res){		
        application.app.controllers.usuario.index(application, req, res);
    });

    application.get('/nivel', function(req, res){		
        application.app.controllers.nivel.index(application, req, res);
    });

    application.get('/situacao', function(req, res){		
        application.app.controllers.situacao.index(application, req, res);
    });

    application.get('/fluxo', function(req, res){		
        application.app.controllers.fluxo.index(application, req, res);
    });

    application.get('/tarefa', function(req, res){		
        application.app.controllers.tarefa.index(application, req, res);
    });
}