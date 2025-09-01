import { Form } from "react-bootstrap";


export const ReservationForm2 = ({reservationData, handleChange, goPrev, goNext, cancel, valError}) => {

  return (
    <Form className="border border-2 rounded rounded-3 mb-2 mt-3 p-4">
      <Form.Group className="mb-3" controlId="formBasicDescProyect">
        <Form.Label>Breve descripción de tu proyecto y trayectoria:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            placeholder="Hablános de tu trayectoria artística y de tu proyecto" 
            onChange={handleChange}
            value={reservationData.proyect_description}
            name="proyect_description"
          />
          {valError.proyect_description && <Form.Text className="text-danger fw-bold mt-2">{valError.proyect_description}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicTypeProyect">
        <Form.Label>¿Qué tipo de proyecto realizarás?</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Por ej. Fotografía de producto, Sesión de retratos, Grabación de vídeo, Podcast..." 
            onChange={handleChange}
            value={reservationData.proyect_type}
            name="proyect_type"
          />
          {valError.proyect_type && <Form.Text className="text-danger fw-bold mt-2">{valError.proyect_type}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSM">
        <Form.Label>Déjanos un enlace a tu red social profesional o de tu proyecto:</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL red social" 
            onChange={handleChange}
            value={reservationData.socialmedia_link}
            name="socialmedia_link"
          />
          {valError.socialmedia_link && <Form.Text className="text-danger fw-bold mt-2">{valError.socialmedia_link}</Form.Text>}
      </Form.Group>
      <div className="d-flex gap-2">
        <button 
            className="babypink-button"
            onClick={goPrev}
        >Anterior
        </button>
        <button 
            className="cancel-button"
            onClick={cancel}
        >Cancelar
        </button>
        <button 
            type="button"
            className="submit-button"
            onClick={goNext}
        >Siguiente
        </button>
      </div>
    </Form>
  )
}
