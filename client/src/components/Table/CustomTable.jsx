import Table from 'react-bootstrap/Table';
import './customTable.css';

export const CustomTable = ({ data, columns }) => {
  return (
    <div className='custom-table-responsive'>
      <Table bordered hover size="sm" className='custom-table text-center'>
        <thead>
          <tr>
            {/* se recorren las columnas y se pintan los títulos */}
            {columns?.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* se recorre la lista de datos */}
          {data?.map((row, index) => (
            <tr key={index}>
              {/* para cada columna se pinta su celda */}
              {columns.map((col) => (
                <td key={col.key}>
                  {/* si la columna tiene render: se usa el condicional y si no, se muestra directamente el valor */}
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
