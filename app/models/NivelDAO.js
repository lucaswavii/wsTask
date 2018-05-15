function NivelDAO( connection ){
	this._connection = connection; 
}

NivelDAO.prototype.listar = function( callback) {
	this._connection.query('select * from nivel order by id', callback);	
}

NivelDAO.prototype.salvar = function( nivel, callback) {	
	
	if( !nivel.id ) {
		this._connection.query('insert into nivel set ?', nivel, callback);
	} else {
		this._connection.query('update nivel set ? where id = ?', [ nivel, nivel.id], callback);	
	}
}

NivelDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from nivel where id = ?', id, callback);
}

NivelDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from nivel where id = ?', id, callback);	
}

module.exports = function(){
	return NivelDAO;
}
