import React  from 'react';
import './EventosFormCss.css';
import EventosContainer from './EventosContainer';
import Alert from "@mui/material/Alert";

function EventosForm() {
  const { states, functions} = EventosContainer();

  return (
    <div className="App">
       {states.error !== null && (
          <Alert
            severity="error"
            style={{ marginBottom: "20px", borderRadius: "40px", width:'70%' }}
          >
            {states.error}
          </Alert>
        )}
      <h1>Eventos</h1>
      {states.user && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pesquisar por título"
            value={states.searchTitulo}
            onChange={(e) => functions.setSearchTitulo(e.target.value)}
          />
          {states.user.roles.includes('ROLE_USER') && (
            <div className="filter-option">
              <label>
                <input
                  type="checkbox"
                  checked={states.filterInscritos}
                  onChange={(e) => functions.setFilterInscritos(e.target.checked)}
                />
                Mostrar apenas inscritos
              </label>
            </div>
          )}
          <button onClick={functions.searchEventos}>Filtrar</button>
        </div>
      )}
      {states.user && states.user.roles.includes('ROLE_MODERATOR') && (
        <form className="formulario" onSubmit={states.editingEvento ? functions.editEvento : functions.createEvento}>
          <input
            type="text"
            placeholder="Título"
            value={states.titulo}
            onChange={(e) => functions.setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={states.descricao}
            onChange={(e) => functions.setDescricao(e.target.value)}
          />
          <input
            type="text"
            placeholder="Localização"
            value={states.localizacao}
            onChange={(e) => functions.setLocalizacao(e.target.value)}
          />
          <input
            type="datetime-local"
            value={states.dataInicio}
            onChange={(e) => functions.setDataInicio(e.target.value)}
          />
          <input
            type="datetime-local"
            value={states.dataFim}
            onChange={(e) => functions.setDataFim(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo"
            value={states.tipo}
            onChange={(e) => functions.setTipo(e.target.value)}
          />
          <button type="submit">{states.editingEvento ? 'Salvar Alterações' : 'Criar Evento'}</button>
        </form>
      )}
      <div className="evento-list">
        {states.eventos.map((evento) => (
          <div key={evento.id} className="evento-card">
            <h2>{evento.titulo}</h2>
            <p>{evento.descricao}</p>
            <p>{evento.localizacao}</p>
            <p>{new Date(evento.dataInicio).toLocaleString()}</p>
            <p>{new Date(evento.dataFim).toLocaleString()}</p>
            <p>{evento.tipo}</p>
            {states.user && states.user.roles.includes('ROLE_USER') && (
              evento.participantes && evento.participantes.some(p => p.id === states.user.id) ? (
                <button disabled>Inscrito</button>
              ) : (
                <button onClick={() => functions.inscrever(evento.id)}>Inscrever-se</button>
              )
            )}
            {states.user && states.user.roles.includes('ROLE_MODERATOR') && (
              <button onClick={() => functions.selectEventoForEdit(evento)}>Editar</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventosForm;

