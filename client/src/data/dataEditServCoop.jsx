export const columns = (servCoopDelete , navigate) => [
  { key: "service_name", label: "Servicio" },  
  
  {key:"Editar",
    label:"Editar",
    render:(row) => (
       <button className="edit-button" onClick={() => navigate(`/admin/editServCoop/${row.service_id}`)}>
        Editar
      </button>
    )
  },
  {key:"Eliminar",
    label:"Borrar",
    render:(row) => (
      <button className="cancel-button" onClick={() => servCoopDelete(row)}
      type="button"
      >
        Borrar
      </button>
    ),
  }
];