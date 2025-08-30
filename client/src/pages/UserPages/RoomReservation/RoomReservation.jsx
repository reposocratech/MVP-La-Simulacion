import { Col, Container, Row } from "react-bootstrap";
import { ReservationForm1 } from "../../../components/ReservationForms/ReservationForm1";
import { useContext, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from "../../../context/AuthContextProvider";
import { ReservationForm2 } from "../../../components/ReservationForms/ReservationForm2";
import { ReservationForm3 } from "../../../components/ReservationForms/ReservationForm3";
import { fetchData } from "../../../helpers/axiosHelper";
import { validateForms } from "../../../helpers/validateForms";
import { reservationSchema1 } from "../../../schemas/reservationSchema1";
import { reservationSchema2 } from "../../../schemas/reservationSchema2";
import { reservationSchema3 } from "../../../schemas/reservationSchema3";
import './roomReservation.css';

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
  user_policy_confirmation: null
}

const RoomReservation = () => {
  const [reservationData, setReservationData] = useState(initialValue);
  const [showForm, setShowForm] = useState(1);
  const [sendFormOk, setSendFormOk] = useState(false);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  const {user, token} = useContext(AuthContext);
  const {id, room_name} = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {

    if (e.target.type === "checkbox") {
      const {name, checked} = e.target;
      setReservationData({...reservationData, [name]: checked ? 1 : 0});
    }
    else {
      const {name, value} = e.target;
      setReservationData({...reservationData, [name]: value});
    }
  }

  const goPrev = (e) => {
    e.preventDefault();
    setShowForm(showForm - 1);
  }

  const goNext = (e) => {
    e.preventDefault();

    try {
      let chosenSchema;
      if (showForm === 1) chosenSchema = reservationSchema1;
      if (showForm === 2) chosenSchema = reservationSchema2;
    
      const {valid, errors} = validateForms(chosenSchema, reservationData);
      setValError(errors);

      if (valid){
        setShowForm(showForm + 1);
        setValError({});
      }

    } catch (error) {
        console.log(error);
        setValError({});
        setMsgError('Algo salió mal, inténtelo de nuevo');
      }
  }

  const cancel = (e) => {
    e.preventDefault();
    setReservationData(initialValue);
    navigate(`/oneRoom/${id}`);
  }

  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      const {valid, errors} = validateForms(reservationSchema3, reservationData);
      setValError(errors);

      if (valid){
        setValError({});

        const allData = {
          user_id: user.user_id,
          room_id: id,
          reservationData: reservationData
        }
        
        const res = await fetchData(`/users/roomReservation/${id}/${room_name}`, "post", allData, token);
        setSendFormOk(true);
      }

    } catch (error) {
      console.log(error);
      setValError({});
      setMsgError('Algo salió mal, inténtelo de nuevo');
    }
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
                roomName={room_name}
                userName={user.user_name}
                userLastname={user.lastname}
                reservationData={reservationData}
                handleChange={handleChange}
                goNext={goNext}
                cancel={cancel}
                valError={valError}/>
            }
            {showForm === 2 &&
              <ReservationForm2
                reservationData={reservationData}
                handleChange={handleChange}
                goPrev={goPrev}
                goNext={goNext} 
                cancel={cancel}
                valError={valError}/>
            }
            {showForm === 3 &&
              <ReservationForm3
                reservationData={reservationData}
                handleChange={handleChange} 
                goPrev={goPrev}
                cancel={cancel}
                onSubmit={onSubmit}
                sendFormOk={sendFormOk}
                valError={valError}
                msgError={msgError}/>
            }
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default RoomReservation;


