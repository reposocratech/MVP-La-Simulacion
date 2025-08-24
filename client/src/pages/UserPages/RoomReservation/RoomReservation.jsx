import { useContext } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContextProvider";

const RoomReservation = () => {

  const {user} = useContext(AuthContext);

  return (
    <section className="section-reservation">
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formPlaintextName">
                <Form.Label>Nombre completo:</Form.Label>
                <Form.Control 
                        plaintext 
                        readOnly 
                        defaultValue="Hola" />
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


