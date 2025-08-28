import { Col, Container, Row } from 'react-bootstrap';
import './adminReservations.css'
import { CustomTable } from '../../../components/Table/CustomTable';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';

const AdminReservations = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [status, setStatus] = useState();

  const {token} = useContext(AuthContext);

  //hook useEffect con una función para traer toda la información de reservas al cargar la página:
  useEffect(()=>{
    const fetchReservations = async() => {
      try {
        const res = await fetchData("/admin/reservations", "get", null, token);
        console.log("RES TABLA RESERVAS", res);
        
      } catch (error) {
        console.log(error);
      }
    }
    fetchReservations();
  }, []);

  // Datos para pasar al componente CustomTable, en un array.
  // La key debe llamarse como el campo de la base de datos, para que la tabla la identifique y la rellene con los datos que llegan.
  // label es el nombre que recibe el "título" de cada columna.
  const columns = [
    {key: "reservation_id", label: "ID Reserva"},
    {key: "room_id", label: "ID Sala"},
    {key: "user_id", label: "ID Usuario"},
    {key: "status", label: "Estado"}
  ]

  return (
    <section className='section-reservations'>
      <Container>
        <h1 className='h1-reservations text-center mb-5'><span className='spanLetter-adReservs accent-text'>R</span>Gestión de las reservas</h1>
        <Row className='row-data text-center gy-4 justify-content-center'>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Total de Reservas</h2>
              <span>3</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Pendientes</h2>
              <span>3</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Confirmadas</h2>
              <span>3</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Canceladas</h2>
              <span>3</span>
            </article>
          </Col>
        </Row>

        <Row>
          <CustomTable 
            columns={columns}
            /> {/* Pasar la data aquí tb*/}
        </Row>

      </Container>
    </section>
  )
}

export default AdminReservations;
