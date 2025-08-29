import { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";

const initialValue = {
  event_title: "",
  event_description: "",
  location: "",
  cover_image: "",
  duration: "",
  start_date: "",
  end_date: "",
  start_hour: "",
  end_hour: "",
  number_of_attendees: "",
  price: "",
  ticket_link: "",
  sections: []
};

const CreateEvent = () => {
  const [dataTotal, setDataTotal] = useState(initialValue);
  const [formOk, setFormOk] = useState(false);

  const navigate = useNavigate();

  const cancel = () => {
    setDataTotal(initialValue);
    navigate('/admin/events');
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col>
              <article>
                <p>Título: </p>
                <p>Descripción:</p>
                <p>Localización:</p>
                <p>Imagen: </p>
                <p>Duración total: </p>
                <p>Fecha de inicio: </p>
                <p>Fecha de fin: </p>
                <p>Hora de inicio: </p>
                <p>Hora de fin: </p>
                <p>Numero de asistentes:</p>
                <p>Coste total:</p>
                <p>Enlace ticketera: </p>
              </article>
            </Col>
            <Col>
              <Outlet context={{
                cancel,
                navigate,
                dataTotal,
                setDataTotal,
                formOk,
                setFormOk
              }}/>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default CreateEvent;