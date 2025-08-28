import { Col, Container, Form, Row } from "react-bootstrap";
import { RiUpload2Fill } from "react-icons/ri";
import "./formeditServCoop.css"

export const FormEditServCoop = ({ handleChange, onSubmit , datosForm ,handleFile , fileError , valErrors , cancel}) => {
  return (
    <section className="d-flex  justify-content-center ">
      <Container fluid>
        <Row>
          <h1 className="text-center mt-5">
            <span className="span-formEditServCoop accent-text align-middle">
              ES
            </span>{" "}
            Editar Servicio{" "}
          </h1>
          <Col className="d-flex justify-content-center">
            <Form className="w-75 border border-2 rounded rounded-3 mb-2 mt-5 p-4">
              <Form.Group  controlId="formBasicTitle">
                <Form.Label className="fw-bold">Titulo:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="service_name"
                  value={datosForm.service_name}
                />
                {valErrors.title && <Form.Text className="text-error">{valErrors.title}</Form.Text>}
              </Form.Group>
              <Form.Group controlId="formBasicDescription">
                <Form.Label className="fw-bold">Descripción:</Form.Label>
                <Form.Control
                  className="textareah"
                  as={"textarea"}
                  onChange={handleChange}
                  name="service_description"
                  value={datosForm.service_description}
                />
                {valErrors.description && <Form.Text className="text-error">{valErrors.description}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>
                  Cambiar Imagen:{" "}
                <RiUpload2Fill size={"2rem"} className="imgup ms-2 align-text-top " />
                </Form.Label>
                <Form.Control
                 onChange={handleFile}
                 type="file" 
                 name="image" 
                 hidden
                 />
                 {fileError && <Form.Text className="text-error">{fileError}</Form.Text>}
                 <div className="d-flex flex-column flex-md-row gap-2 mt-3">
                <button onClick={cancel} className="cancel-button w-auto">Cancelar</button>
                <button onClick={onSubmit} className="submit-button w-auto">
                  Aceptar
                </button>
              </div>
              </Form.Group>              
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
