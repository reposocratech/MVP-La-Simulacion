import { Col, Container, Form, Row } from 'react-bootstrap';
import './formEditRoom.css';

export const FormEditRoom1 = ({room, handleChange, cancel, valError, msgError, next}) => {
  return (
        <section className='section-createRoom'>
        <Container fluid>
          <Row>
            <h1 className='h1-createRoom  text-center p-2 my-5'><span className='span-createRoom accent-text align-middle'>ES</span>Editar sala (Paso 1):</h1>
            <Col className="d-flex justify-content-center">
              <Form className='w-75 border border-2 p-4 rounded rounded-3'>
                <Form.Group className="mb-3" controlId="formBasicRoom_Name">
                  <Form.Label>Nombre de la sala:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={room.room_name}
                    name="room_name"
                  />
                  {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRoom_Description">
                  <Form.Label>Decripción de la sala:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={room.room_description}
                    name="room_description"
                  />
                  {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicWho_Can_Use_It">
                  <Form.Label>¿Quién puede utilizarla?</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    value={room.who_can_use_it}
                    name="who_can_use_it"
                  />
                  {valError.who_can_use_it && <Form.Text className="text-danger fw-bold">{valError.who_can_use_it}</Form.Text>}
                </Form.Group>
                {msgError && <p className="text-danger fw-bold">{msgError}</p>}
                  <div className='d-flex flex-column flex-md-row gap-2'>
                    <button className='cancel-button' onClick={cancel}>Cancelar</button>
                    <button className='submit-button' onClick={next}>Siguiente</button>
                  </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
  )
}
