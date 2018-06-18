function EventoDAO( connection ){
	this._connection = connection; 
}

EventoDAO.prototype.listar = function( tarefa, callback) {
	this._connection.query('select * from evento where tarefa = ? order by id', tarefa.id, callback);	
}

EventoDAO.prototype.salvar = function( evento, callback) {	
	
	if( !evento.id ) {
		this._connection.query('insert into evento set ?', evento, callback);
	} else {
		this._connection.query('update evento set ? where id = ?', [ evento, evento.id], callback);	
	}
}

EventoDAO.prototype.editar = function( id, callback) {
	this._connection.query('select * from evento where id = ?', id, callback);
}

EventoDAO.prototype.excluir = function( id, callback) {	
	this._connection.query('delete from evento where id = ?', id, callback);	
}

module.exports = function(){
	return EventoDAO;
}
