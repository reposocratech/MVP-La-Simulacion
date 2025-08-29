import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Container, Row } from 'react-bootstrap';
import { CustomTable } from '../../../components/Table/CustomTable';
import { columns } from '../../../data/dataEditServCoop.jsx';
import { useNavigate } from "react-router";
import "./adminservcoop.css"

export const EditServCoop = () => {  
  const { token } = useContext(AuthContext);
  const [servCoopData, setServCoopData] = useState([]);

  const navigate = useNavigate()

  const servCoopDelete = async (data ) => {
 
  try {
    const res = await fetchData("/services/delservcoop", "put", {service_id: data.service_id}, token);
    setServCoopData(servCoopData.filter(e=>e.service_id !== data.service_id));
        
  } catch (error) {
    console.error("Error al borrar servicio:", error);
  }
};

  const column = columns(servCoopDelete , navigate);

  

  useEffect(() => {
    const fetchServCoop = async() => {
      try {
        const res = await fetchData("/services/adminservicescoop", "get", null, token);
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
        <button onClick={() => navigate("/admin/createServCoop")} className='create-button w-25'>Crear Nuevo Servicio</button>
        <CustomTable 
          columns={column}
          data={servCoopData}
        />
        </Row>
      </Container>
    </section>
  )
}
  
export default EditServCoop;