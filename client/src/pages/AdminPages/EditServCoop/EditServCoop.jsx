import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../../components/Table/CustomTable';

//datos para pasar al componente table
// la key debe llamarse como el campo de la base de datos para que la identifique y la rellene con los datos que llegan
//label es el nombre que recibe el "titulo" de cada columna
const columns = [
  { key: "service_name", label: "Servicio" },
  { key: "service_description", label: "Descripción" },
  {
    key: "image",
    label: "Imagen",
    render: (row) => (
      <img
         src={`http://localhost:4000/images/servCoop/${row.image}`} 
        alt={row.service_name}
        style={{ width: "80px", height: "auto", objectFit: "cover" }}
      />
    ),
  },
  {key:"Eliminar",
    label:"Borrar",
    render:(row) => (
      <button>
        Borrar
      </button>
    ),
  },
  {key:"Editar",
    label:"Editar",
    render:(row) => (
      <button >
        Editar
      </button>
    )
  }
];

export const EditServCoop = () => {  
  const { token } = useContext(AuthContext);
  const [servCoopData, setServCoopData] = useState([]);
  useEffect(() => {
    const fetchServCoop = async() => {
      try {
        const res = await fetchData("/services/servicescoop", "get", null, token);
        const servCoop = res.data.result;
              setServCoopData(servCoop);
              console.log("Respuesta del servidor:", res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServCoop();
  }, []);

  return (
    <section >
      <Container>
        <h1><span>U</span>Edicion de los Servicios de la cooperativa</h1>
        <Row className="text-center gy-4 justify-content-center">
        </Row>

        <CustomTable 
          columns={columns}
          data={servCoopData}
        />
      </Container>
    </section>
  )
}
  
export default EditServCoop;