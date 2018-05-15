function SituacaoDAO( connection ){
	this._connection = connection; 
}

SituacaoDAO.prototype.listar = function( callback) {
	this._connection.query('select * from situacao order by id', callback);	
}

SituacaoDAO.prototype.salvar = function( situacao, callback) {	
	
	if( !situacao.id ) {
		this._connection.query('insert into situacao set ?', situacao, callback);
	} else {
		this._connection.query('update situacao set ? where id = ?', [ situacao, situacao.id], callback);	
	}
}

SituacaoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from situacao where id = ?', id, callback);
}

SituacaoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from situacao where id = ?', id, callback);	
}

module.exports = function(){
	return SituacaoDAO;
}
