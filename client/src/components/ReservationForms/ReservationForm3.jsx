import { Form } from "react-bootstrap";


export const ReservationForm3 = ({handleChange, cancel}) => {

  return (
    <Form className="border border-2 rounded rounded-3 mb-2 mt-3 p-4">
      <Form.Group className="mb-3" controlId="formBasicLights">
        <Form.Label>¿Necesitas alquilar el material de iluminación adicional?</Form.Label>
        <div className="d-flex gap-4">
          <Form.Check
            type="radio"
            id="option-yes"
            name="lights-material"
            label="Sí"
            value="sí"
            // checked={confirmed === 'yes'}
          />
          <Form.Check
            type="radio"
            id="option-no"
            name="lights-material"
            label="No"
            value="no"
            // checked={confirmed === 'yes'}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPeople">
        <Form.Label>¿Cuántas personas estarán presentes en la sesión?</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Número de personas"
            onChange={handleChange}
            />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAdditionalReq">
        <Form.Label>¿Tienes algún requerimiento técnico o logístico adicional?</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Cuéntanos qué necesita tu proyecto" 
            onChange={handleChange}
          />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicLights">
        <Form.Label>Confirmo que he leído y acepto las condiciones de uso:</Form.Label>
          <Form.Check
            type="checkbox"
            id="option-yes"
            name="lights-material"
            label="Sí, he leído y acepto las condiciones."
            value="sí"
            // checked={confirmed === 'yes'}
          />
      </Form.Group>
      
      
      <div className="d-flex gap-2">
        <button 
            className="cancel-button"
            onClick={cancel}
        >Cancelar
        </button>
        <button className="submit-button">Enviar Solicitud</button>
      </div>
    </Form>
  )
}
