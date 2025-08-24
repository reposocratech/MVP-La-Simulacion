import { useContext } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";
import './roomReservation.css';

const RoomReservation = () => {

  const {user} = useContext(AuthContext);

  return (
    <section className="section-reservation">
      <Container>
        <h1 className="text-center">
        <span className="accent-text spanLetter-reservation">PA</span>
          Solicitud de Reserva
        </h1>
        <Row className="d-flex justify-content-center">
          <Col xs={12} lg={6}>
            <Form className="form-register border border-2 rounded rounded-3 mb-2">
              <Form.Group className="mb-3" controlId="formPlaintextName">
                <Form.Label>Nombre completo:</Form.Label>
                <Form.Control 
                        plaintext 
                        readOnly 
                        defaultValue={user.user_name} />
              </Form.Group>

              
              <div>
                <button className="cancel-button">Cancelar</button>
                <button className="submit-button">Siguiente</button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default RoomReservation;


