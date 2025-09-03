import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { fetchData } from "../../../helpers/axiosHelper";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useState } from "react";
import './oneReservation.css';

const OneReservation = () => {
  const [reservation, setReservation] = useState({});
  const {id} = useParams();

  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchReservation = async() => {
      try {
        const res = await fetchData(`/admin/reservations/${id}`, "get", null, token);
        setReservation(res.data[0]);

      } catch (error) {
        console.log(error);
      }
    }
    fetchReservation();
  }, [token, id]);

  console.log("DATA RESERV", reservation);

  const {
    user_id,
    user_name,
    lastname,
    room_name,
    reservation_id,
    phone_number,
    date,
    start_hour,
    end_hour,
    proyect_description,
    proyect_type,
    socialmedia_link,
    ilumination_material,
    number_of_attendees,
    aditional_requirement,
    status
  } = reservation;

  const getStatusLabel = (status) => {
    switch (status) {
      case 1: return "Pendiente";
      case 2: return "Confirmada";
      case 3: return "Cancelada";
      default: return "Desconocido";
    };
  }

  return (
    <section className="section-one-reserv">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title 
                  className="bg-color-light-green p-3 fw-bold text-center"
                >Solicitud de Reserva de la Sala:<br /> {room_name} - (ID de sala: {reservation_id})
                </Card.Title>
                <Card.Subtitle className="my-3">
                  <strong>
                      USUARIO con ID
                    </strong> {user_id}: {user_name} {lastname ? lastname : null}
                    <button 
                        className="btn-table ms-2"
                        onClick={() => navigate(`/admin/userProfile/${user_id}`)}>Ver Usuario
                    </button>
                </Card.Subtitle>
                <Card.Text>
                  <p><strong>Estado de la Reserva:</strong> {getStatusLabel(status)}</p>
                  <p><strong>Teléfono:</strong> {phone_number}</p>
                  <p><strong>Fecha:</strong> {date}</p>
                  <p><strong>Hora de inicio:</strong> {start_hour}</p>
                  <p><strong>Hora de fin:</strong> {end_hour}</p>
                  <p><strong>Descripción del proyecto y trayectoria:</strong> {proyect_description}</p>
                  <p><strong>Tipo de proyecto:</strong> {proyect_type}</p>
                  <p><strong>Enlace profesional o de proyecto:</strong> {socialmedia_link}</p>
                  <p><strong>¿Necesita material de iluminación?</strong> {ilumination_material === 0 ? "No" : "Sí"}</p>
                  <p><strong>Nº asistentes:</strong> {number_of_attendees}</p>
                  <p><strong>¿Tiene requerimientos técnicos o lógísticos adicionales?</strong> {aditional_requirement || "No especificado"}</p>
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <button 
                      className="babypink-button"
                      onClick={()=>navigate("/admin/reservations")}>
                    Volver al listado de reservas
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OneReservation;
