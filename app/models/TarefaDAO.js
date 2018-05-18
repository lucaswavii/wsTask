function TarefaDAO( connection ){
	this._connection = connection; 
}

TarefaDAO.prototype.listar = function( callback) {
	this._connection.query('select * from tarefa order by id', callback);	
}

TarefaDAO.prototype.salvar = function( tarefa, callback) {	
	
	if( !tarefa.id ) {
		this._connection.query('insert into tarefa set ?', tarefa, callback);
	} else {
		this._connection.query('update tarefa set ? where id = ?', [ tarefa, tarefa.id], callback);	
	}
}

TarefaDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from tarefa where id = ?', id, callback);
}

TarefaDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from tarefa where id = ?', id, callback);	
}

module.exports = function(){
	return TarefaDAO;
}
