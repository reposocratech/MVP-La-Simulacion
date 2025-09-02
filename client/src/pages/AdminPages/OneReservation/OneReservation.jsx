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
  } = reservation;

  return (
    <section className="section-one-reserv">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title>Solicitud de Reserva de la Sala: {reservation_id}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>
                   <strong>Usuario ID:</strong> {user_id}<br />
                  <strong>Teléfono:</strong> {phone_number}<br />
                  <strong>Fecha:</strong> {date}<br />
                  <strong>Hora de inicio:</strong> {start_hour}<br />
                  <strong>Hora de fin:</strong> {end_hour}<br />
                  <strong>Descripción:</strong> {proyect_description}<br />
                  <strong>Tipo de proyecto:</strong> {proyect_type}<br />
                  <strong>Redes:</strong> {socialmedia_link}<br />
                  <strong>Material iluminación:</strong> {ilumination_material}<br />
                  <strong>Nº asistentes:</strong> {number_of_attendees}<br />
                  <strong>Requisitos extra:</strong> {aditional_requirement}
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
