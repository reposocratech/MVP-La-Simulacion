import { Form } from 'react-bootstrap';

export const FormRoom1 = ({room, setRoom, handleChange, next, cancel}) => {

  return (
    <section>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicRoom_Name">
            <Form.Label>Nombre de la sala:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Nombre o título de la sala"
              onChange={handleChange}
              value={room.room_name}
              name="room_name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRoom_Description">
            <Form.Label>Decripción de la sala:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Características y resumen de la sala"
              onChange={handleChange}
              value={room.room_description}
              name="room_description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicWho_Can_Use_It">
            <Form.Label>¿Quién puede utiizarla?</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Requisitos de los usuarios para poder usar la sala"
              onChange={handleChange}
              value={room.who_can_use_it}
              name="who_can_use_it"
            />
          </Form.Group>
            <button onClick={cancel}>Cancelar</button>
            <button onClick={next}>Siguiente</button>
        </Form>
      </section>
  )
}
