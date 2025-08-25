import { Col, Container, Row } from "react-bootstrap";
import { ReservationForm1 } from "../../../components/ReservationForms/ReservationForm1";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { AuthContext } from "../../../context/AuthContextProvider";
import { ReservationForm2 } from "../../../components/ReservationForms/ReservationForm2";
import { ReservationForm3 } from "../../../components/ReservationForms/ReservationForm3";
import './roomReservation.css';


const RoomReservation = () => {
  const [reservationData, setReservationData] = useState();
  const [showForm, setShowForm] = useState(1);

  const {user} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = () => {

  }

  const goNext = (e, numberForm) => {
    e.preventDefault();
    setShowForm(numberForm + 1);
  }

  const cancel = (e) => {
    e.preventDefault();
    setReservationData();
    navigate("/oneRoom/2");
  }

  return (
    <section className="section-reservation">
      <Container>
        <h1 className="h1-reservation text-center">
        <span className="accent-text spanLetter-reservation">SR</span>
          Solicitud de Reserva
        </h1>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={6}>
            {showForm === 1 &&
              <ReservationForm1 
                userName={user.user_name}
                userLastname={user.lastname}
                handleChange={handleChange}
                goNext={goNext}
                cancel={cancel}/>
            }
            {showForm === 2 &&
              <ReservationForm2
                goNext={goNext} 
                cancel={cancel}/>
            }
            {showForm === 3 &&
              <ReservationForm3 
                cancel={cancel}/>
            }
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default RoomReservation;


