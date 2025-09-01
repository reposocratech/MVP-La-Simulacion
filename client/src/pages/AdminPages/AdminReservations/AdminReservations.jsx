import { Col, Container, Row } from 'react-bootstrap';
import './adminReservations.css'
import { CustomTable } from '../../../components/Table/CustomTable';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate } from 'react-router';

const AdminReservations = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [status, setStatus] = useState();

  const navigate = useNavigate();

  const {token} = useContext(AuthContext);

  //hook useEffect con una función para traer toda la información de reservas al cargar la página:
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetchData("/admin/reservations", "get", null, token);
        const reservations = res.data;

        // Contadores según el estado de las reservas:
        const total = reservations.length;
        const pending = reservations.filter(r => r.status === 1).length;
        const confirmed = reservations.filter(r => r.status === 2).length;
        const cancelled = reservations.filter(r => r.status === 3).length;

        setReservationsData(reservations);
        setStatus({ total, pending, confirmed, cancelled });
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [token]); // o [] si token no cambia

  // Función para actualizar el estado de una reserva:
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetchData("/admin/reservations/status", "put", { id, status: newStatus }, token);

      // Actualizar solo la reserva modificada
      const updatedReservations = reservationsData.map(r =>
        r.reservation_id === id ? { ...r, status: newStatus } : r
      );
      setReservationsData(updatedReservations);

      // Actualizar contadores en status
      const total = updatedReservations.length;
      const pending = updatedReservations.filter(r => r.status === 1).length;
      const confirmed = updatedReservations.filter(r => r.status === 2).length;
      const cancelled = updatedReservations.filter(r => r.status === 3).length;

      setStatus({ total, pending, confirmed, cancelled});
    } catch (error) {
      console.log(error);
    }
  };


  // Datos para pasar al componente CustomTable, en un array.
  // La key debe llamarse como el campo de la base de datos, para que la tabla la identifique y la rellene con los datos que llegan.
  // label es el nombre que recibe el "título" de cada columna.
  const columns = [
    { 
      key: "more_info", 
      label: "Datos recibidos",
      render: (row) => (
      <div className="text-center">
        <button
          className="btn-table bg-color-light-green"
          onClick={() => navigate(`/admin/reservations/${row.reservation_id}`)}
        >
          Ver más info
        </button>
      </div>
  )
    },
    { 
      key: "reservation_id", 
      label: "ID Reserva"
    },
    {
      key: "room_id", 
      label: "ID Sala"
    },
    {
      key: "room_name", 
      label: "Nombre Sala"
    },
    {
      key: "user_id", 
      label: "ID Usuario"
    },
    {
      key: "status", 
      label: "Estado",
      render: (row) => {
        switch (row.status) {
          case 1: return "Pendiente";
          case 2: return "Confirmada";
          case 3: return "Cancelada";
          default: return "Desconocido";
        }
      }
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          {row.status === 1 ? (
            <>
              <button
                className="btn-table confirmRes"
                onClick={() => handleStatusChange(row.reservation_id, 2)}
              >
                Confirmar
              </button>
              <button
                className="btn-table cancelRes"
                onClick={() => handleStatusChange(row.reservation_id, 3)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn-table edit"
              onClick={() => handleStatusChange(row.reservation_id, 1)}
            >
              Resetear a Pendiente
            </button>
          )}
        </div>
      )
    }

  ]

  return (
    <section className='section-reservations'>
      <Container>
        <h1 className='h1-reservations text-center mb-5'><span className='spanLetter-adReservs accent-text'>R</span>Gestión de las reservas</h1>
        <Row className='row-data text-center gy-4 justify-content-center'>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Total de Reservas</h2>
              <span>{status?.total}</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Pendientes</h2>
              <span>{status?.pending}</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Confirmadas</h2>
              <span>{status?.confirmed}</span>
            </article>
          </Col>
          <Col sm={9} md={6} lg={3}>
            <article className="d-flex flex-column justify-content-between h-100">
              <h2>Reservas Canceladas</h2>
              <span>{status?.cancelled}</span>
            </article>
          </Col>
        </Row>

        <Row>
          <CustomTable 
            columns={columns}
            data={reservationsData}
            /> 
        </Row>

      </Container>
    </section>
  )
}

export default AdminReservations;
