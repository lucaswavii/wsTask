function PessoaDAO( connection ){
	this._connection = connection; 
}

PessoaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from pessoa order by id', callback);	
}

PessoaDAO.prototype.salvar = function( pessoa, callback) {	

	if( !pessoa.id ) {
		this._connection.query('insert into pessoa set ?', pessoa, callback);
	} else {
		this._connection.query('update pessoa set ? where id = ?', [ pessoa, pessoa.id], callback);	
	}
}

PessoaDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from pessoa where id = ?', id, callback);
}

PessoaDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from pessoa where id = ?', id, callback);	
}

module.exports = function(){
	return PessoaDAO;
}
