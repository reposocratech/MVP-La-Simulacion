export const columns = (servCoopEdit, servCoopDelete) => [
  { key: "service_name", label: "Servicio" },

  
  {key:"Eliminar",
    label:"Borrar",
    render:(row) => (
      <button className="submit-button" onClick={() => servCoopDelete(row )}
      type="button"
      >
        Borrar
      </button>
    ),
  },
  {key:"Editar",
    label:"Editar",
    render:(row) => (
       <button className="cancel-button" onClick={() => servCoopEdit(row )}>
        Editar
      </button>
    )
  }
];