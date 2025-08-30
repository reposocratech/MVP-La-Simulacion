import { Col, Form, Row } from "react-bootstrap";


export const ReservationForm1 = ({roomName, userName, userLastname, reservationData, handleChange, goNext, cancel}) => {

  return (
    <Form className="border border-2 rounded rounded-3 mb-2 mt-3 p-4">
      <Form.Group className="mb-3" controlId="formBasicRoom">
        <Form.Label>Espacio a reservar:</Form.Label>
        <Form.Control
          type="text"
          placeholder={roomName}
          aria-label="Sala a reservar"
          disabled
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFullName">
        <Form.Label>Tu nombre:</Form.Label>
        <Form.Control
          type="text"
          placeholder={`${userName} ${userLastname ? userLastname : ""}`}
          aria-label="Nombre completo que aparece en tu perfil"
          disabled
          readOnly
        />
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBasicPhone">
        <Form.Label column sm="5">Teléfono de contacto:</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="text"
            placeholder="Número de teléfono"
            onChange={handleChange}
            value={reservationData.phone_number}
            name="phone_number"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBasicDate">
        <Form.Label column sm="5">Fecha solicitada:</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="date"
            onChange={handleChange}
            value={reservationData.date}
            name="date"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBasicStartHour">
        <Form.Label column sm="5">Hora de inicio:</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="time"
            onChange={handleChange}
            value={reservationData.start_hour}
            name="start_hour"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-4" controlId="formBasicEndHour">
        <Form.Label column sm="5">Hora de fin:</Form.Label>
        <Col sm={7}>
          <Form.Control
            type="time"
            onChange={handleChange}
            value={reservationData.end_hour}
            name="end_hour"
          />
        </Col>
      </Form.Group>
      <div className="d-flex gap-2">
        <button 
            className="cancel-button"
            onClick={cancel}
        >Cancelar
        </button>
        <button 
            className="submit-button"
            type="button"
            onClick={goNext}
            >Siguiente
        </button>
      </div>
    </Form>
  )
}
