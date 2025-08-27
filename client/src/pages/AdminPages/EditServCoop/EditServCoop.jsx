import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../../components/Table/CustomTable';
import { columns } from '../../../data/dataEditServCoop.jsx';
import "./editservcoop.css"

export const EditServCoop = () => {  
  const { token } = useContext(AuthContext);
  const [servCoopData, setServCoopData] = useState([]);

  const servCoopEdit = async ()=>{
   console.log("hola");
   
    
    
  }

const servCoopDelete = async (data ) => {
 
  try {
    const res = await fetchData("/services/delservcoop", "put", {service_id: data.service_id}, token);
    console.log("Servicio eliminado:", res.data);
    setServCoopData(servCoopData.filter(e=>e.service_id !== data.service_id));
    
    
  } catch (error) {
    console.error("Error al borrar servicio:", error);
  }
};

  const column = columns(servCoopEdit, servCoopDelete);

  

  useEffect(() => {
    const fetchServCoop = async() => {
      try {
        const res = await fetchData("/services/servicescoop", "get", null, token);
        const servCoop = res.data.result;
              setServCoopData(servCoop);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServCoop();
  }, []);

  return (
    <section >
      <Container>
        <h1 className='mrg text-center'><span className='span-editservCoop  accent-text align-middle' >ESC</span> Edicion de los Servicios de la cooperativa</h1>
        <Row className="text-center gy-4 justify-content-center">
        </Row>
        <CustomTable 
          columns={column}
          data={servCoopData}
        />
      </Container>
    </section>
  )
}
  
export default EditServCoop;