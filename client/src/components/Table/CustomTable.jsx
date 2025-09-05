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

        {/* iteración sobre filas y columnas */}
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}
                  /* aplicación de estilos condicionales */
                  className={row.status === 1 ? 'row-pending' : ''}>
                  {/* renderizado flexible: si existe col.render utiliza función personalizada y si no, se muestra el valor */}
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
