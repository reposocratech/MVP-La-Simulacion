export const columns = (servCoopDelete, navigate) => [
  { key: "service_name", label: "Servicio" },

  {
    key: "service_description",
    label: "Descripción",
    render: (row) => (
      <span>
        {row.service_description.length > 80
          ? `${row.service_description.slice(0, 80)}...`
          : row.service_description}
      </span>
    ),
  },

  {
    key: "Editar",
    label: "Editar",
    render: (row) => (
      <button
        className="btn-table edit"
        onClick={() => navigate(`/admin/editServCoop/${row.service_id}`)}
      >
        Editar
      </button>
    ),
  },
  {
    key: "Eliminar",
    label: "Borrar",
    render: (row) => (
      <button
        className="btn-table block"
        onClick={() => servCoopDelete(row)}
        type="button"
      >
        Borrar
      </button>
    ),
  },
];
