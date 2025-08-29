import { Col, Container, Form, Row } from 'react-bootstrap';
import { RiUpload2Fill } from "react-icons/ri";
import './formRoom.css';

export const FormRoom2 = ({room, handleChange, cancel, previous, handleFile, onSubmit, valError, msgError, fileError}) => {

  return (
    <section className='section-createRoom'>
        <Container fluid>
          <Row><h1 className='h1-createRoom  text-center p-2 mb-3'><span className='span-createRoom accent-text align-middle'>ES</span>Crear sala (Paso 2):</h1>
            <Col className="d-flex justify-content-center">
              <Form className='w-75 border border-2 p-4 rounded rounded-3'>
                <Form.Group className="mb-3" controlId="formBasicPricing">
                  <Form.Label>Precios:</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    type="text"
                    placeholder="Precios del alquiler de la sala y de los extras que pueda tener"
                    onChange={handleChange}
                    value={room.pricing}
                    name="pricing"
                  />
                  {valError.pricing && <Form.Text className="text-danger fw-bold">{valError.pricing}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsage_Policy">
                  <Form.Label>Política y condiciones de uso:</Form.Label>
                  <Form.Control as="textarea" rows={3}
                    type="text"
                    placeholder="Política, condiciones, normas..."
                    onChange={handleChange}
                    value={room.usage_policy}
                    name="usage_policy"
                  />
                  {valError.usage_policy && <Form.Text className="text-danger fw-bold">{valError.usage_policy}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicFile">
                  <Form.Label>Subir imágenes a la sala <RiUpload2Fill className='ms-2 align-text-top'/></Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFile}
                    multiple
                    name="file"
                    hidden
                  />
                  {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
                </Form.Group>
                {msgError && <Form.Text className="text-danger fw-bold">{msgError}</Form.Text>}
                  <div className='d-flex flex-column flex-md-row gap-2'>
                    <button className='prev-button w-auto' onClick={previous}>Anterior</button>
                    <button className='cancel-button w-auto' onClick={cancel}>Cancelar</button>
                    <button className='submit-button w-auto' onClick={onSubmit}>Guardar y finalizar</button>
                  </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
  )
}
