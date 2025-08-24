import Table from 'react-bootstrap/Table';
import './customTable.css';

export const CustomTable = ({ data, columns }) => {
  return (
    <Table bordered hover size="sm" className='custom-table'>
      <thead>
        <tr>
          {columns?.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data?.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tr>
      </tbody>
    </Table>
  )
}
