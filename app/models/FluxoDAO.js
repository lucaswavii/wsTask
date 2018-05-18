function FluxoDAO( connection ){
	this._connection = connection; 
}

FluxoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from fluxo where ( fim is null or fim > now() ) order by id', callback);	
}

FluxoDAO.prototype.salvar = function( fluxo, callback) {	
	
	if( !fluxo.id ) {
		this._connection.query('insert into fluxo set ?', fluxo, callback);
	} else {
		this._connection.query('update fluxo set ? where id = ?', [ fluxo, fluxo.id], callback);	
	}
}

FluxoDAO.prototype.salvarFluxos = function( fluxos, callback) {	
	this._connection.query('insert into fluxo_situacao set ?', fluxos, callback);
}

FluxoDAO.prototype.listarFluxos = function( callback) {	
	this._connection.query('select * from fluxo_situacao order by ordem', callback);	
}

FluxoDAO.prototype.excluirFluxos = function( id, callback) {	
	this._connection.query('delete from fluxo_situacao where id = ?', id, callback);	
}

FluxoDAO.prototype.pegarFluxos = function( fluxo, situacao, callback) {	
	this._connection.query('select * from fluxo_situacao where fluxo = ? and situacao = ? ', [ fluxo, situacao ], callback);	
}

FluxoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from fluxo where id = ?', id, callback);
}

FluxoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from fluxo where id = ?', id, callback);	
}

module.exports = function(){
	return FluxoDAO;
}
