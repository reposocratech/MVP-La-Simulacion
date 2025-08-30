import { Col, Container, Form, Row } from "react-bootstrap";
import { RiUpload2Fill } from "react-icons/ri";
import "./formServCoop.css";

export const FormServCoop = ({ handleChange, onSubmit , datesForm ,handleFile , fileError , valErrors , cancel}) => {
  return (
    <section className="d-flex  justify-content-center ">
      <Container fluid>
        <Row>
          <h1 className="text-center mt-5">
            <span className="span-formServCoop accent-text align-middle">
              ES
            </span>{" "}
            Crea Nuevo Servicio{" "}
          </h1>
          <Col className="d-flex justify-content-center">
            <Form className="w-50 border border-2 rounded rounded-3 mb-2 mt-5 p-4">
              <Form.Group  controlId="formBasicServiceName">
                <Form.Label className="fw-bold">Titulo:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titulo del Servicio"
                  onChange={handleChange}
                  name="service_name"
                  value={datesForm.service_name}
                />
                {valErrors.service_name && <Form.Text className="text-error">{valErrors.service_name}</Form.Text>}
              </Form.Group>
              <Form.Group controlId="formBasicDescription">
                <Form.Label className="fw-bold">Descripción:</Form.Label>
                <Form.Control
                  className="textareah"
                  as={"textarea"}
                  placeholder="Caracteristicas del Servicio"
                  onChange={handleChange}
                  name="service_description"
                   value={datesForm.service_description}
                />
                {valErrors.service_description && <Form.Text className="text-error">{valErrors.service_description}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicFile">
                <Form.Label>
                  Subir imagen de Servicio:{" "}
                <RiUpload2Fill size={"2rem"} className="imgup ms-2 align-text-top " />
                </Form.Label>
                <Form.Control
                 onChange={handleFile}
                 type="file" 
                 name="image"
                 accept="image/*" 
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
