export const columnReview = (reviewDelete ) => [
  { key: "event_title", label: "Evento" }, 
  { key: "description", label: "Comentario" }, 
  { key: "rating", label: "Valoración" },    
  { key:"Eliminar",
    label:"Borrar",
    render:(row) => (
      <button className="btn-table block" onClick={() => reviewDelete(row)}
      type="button"
      >
        Borrar
      </button>
    ),
  }
];