import { Form } from "react-bootstrap";


export const ReservationForm2 = ({reservationData, handleChange, goNext, cancel}) => {

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
      </Form.Group>
      <div className="d-flex gap-2">
        <button 
            className="cancel-button"
            onClick={cancel}
        >Cancelar
        </button>
        <button 
            type="button"
            className="submit-button"
            onClick={(e)=>goNext(e, 2)}
        >Siguiente
        </button>
      </div>
    </Form>
  )
}
