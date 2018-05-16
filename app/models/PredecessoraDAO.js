function PredecessoraDAO( connection ){
	this._connection = connection; 
}

PredecessoraDAO.prototype.listar = function( callback) {
	this._connection.query('select * from predecessora where ( fim is null or fim > now() ) order by id', callback);	
}

PredecessoraDAO.prototype.salvar = function( predecessora, callback) {	
	
	if( !predecessora.id ) {
		this._connection.query('insert into predecessora set ?', predecessora, callback);
	} else {
		this._connection.query('update predecessora set ? where id = ?', [ predecessora, predecessora.id], callback);	
	}
}

PredecessoraDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from predecessora where id = ?', id, callback);
}

PredecessoraDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from predecessora where id = ?', id, callback);	
}

module.exports = function(){
	return PredecessoraDAO;
}
