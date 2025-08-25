import { Form } from "react-bootstrap";


export const ReservationForm3 = ({reservationData, handleChange, cancel}) => {

  return (
    <Form className="border border-2 rounded rounded-3 mb-2 mt-3 p-4">
      <Form.Group className="mb-3" controlId="formBasicLights">
        <Form.Label>¿Necesitas alquilar el material de iluminación adicional?</Form.Label>
        <div className="d-flex gap-4">
          <Form.Check
            type="radio"
            id="ilumination-yes"
            onChange={handleChange}
            name="ilumination_material"
            label="Sí"
            value={1}
            checked={reservationData.ilumination_material === 1}
          />
          <Form.Check
            type="radio"
            id="ilumination-no"
            onChange={handleChange}
            name="ilumination_material"
            label="No"
            value={0}
            checked={reservationData.ilumination_material === 0}
          />
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPeople">
        <Form.Label>¿Cuántas personas estarán presentes en la sesión?</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Número de personas"
            onChange={handleChange}
            value={reservationData.number_of_attendees}
            name="number_of_attendees"
            />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAdditionalReq">
        <Form.Label>¿Tienes algún requerimiento técnico o logístico adicional?</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Cuéntanos qué necesita tu proyecto" 
            onChange={handleChange}
            value={reservationData.aditional_requirement}
            name="aditional_requirement"
          />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicPolicy">
        <Form.Label>Confirmo que he leído y acepto las condiciones de uso:</Form.Label>
          <Form.Check
            type="checkbox"
            id="user_policy_check"
            onChange={handleChange}
            name="user_policy_confirmation"
            label="Sí, he leído y acepto las condiciones."
            value={1}
            checked={reservationData.user_policy_confirmation === 1}
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
