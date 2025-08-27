import { Col, Container, Row } from "react-bootstrap";
import { ReservationForm1 } from "../../../components/ReservationForms/ReservationForm1";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { AuthContext } from "../../../context/AuthContextProvider";
import { ReservationForm2 } from "../../../components/ReservationForms/ReservationForm2";
import { ReservationForm3 } from "../../../components/ReservationForms/ReservationForm3";
import './roomReservation.css';
import { fetchData } from "../../../helpers/axiosHelper";

const initialValue = {
  phone_number: "",
  date: "",
  start_hour: "",
  end_hour: "",
  proyect_description: "",
  proyect_type: "",
  socialmedia_link: "",
  ilumination_material: "",
  number_of_attendees: "",
  aditional_requirement: "",
  user_policy_confirmation: ""
}

const RoomReservation = () => {
  const [reservationData, setReservationData] = useState(initialValue);
  const [showForm, setShowForm] = useState(1);

  const {user, token} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setReservationData({...reservationData, [name]: value});
  }

  const goNext = (e, numberForm) => {
    e.preventDefault();
    setShowForm(numberForm + 1);
  }

  const cancel = (e) => {
    e.preventDefault();
    setReservationData(initialValue);
    navigate("/oneRoom/2");
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await fetchData("/users/roomReservation", "post", reservationData, token);
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  } 
  console.log("ReservationData", reservationData);

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
                reservationData={reservationData}
                handleChange={handleChange}
                goNext={goNext}
                cancel={cancel}/>
            }
            {showForm === 2 &&
              <ReservationForm2
                reservationData={reservationData}
                handleChange={handleChange}
                goNext={goNext} 
                cancel={cancel}/>
            }
            {showForm === 3 &&
              <ReservationForm3
                reservationData={reservationData}
                handleChange={handleChange} 
                cancel={cancel}
                onSubmit={onSubmit}/>
            }
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default RoomReservation;


