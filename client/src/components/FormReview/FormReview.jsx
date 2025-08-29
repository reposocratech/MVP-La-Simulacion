
import { useState } from "react";
import { Form } from "react-bootstrap";

export const FormReview = () => {
  const [rating, setRating] = useState(0);

  return (
    <Form className='p-3 border border-2 rounded-4'>
     
      <Form.Group className="mb-3" controlId="formBasicRoom_Description">
        <Form.Control 
          as="textarea" 
          rows={3}
          placeholder="Escribe tu reseña"
          // onChange={handleChange}
          // value={room.room_description}
          // name="room_description"
        />
        {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
      </Form.Group>
        <div className='d-flex flex-column flex-md-row gap-2'>
          <button className='submit-button' >Aceptar</button>
          <button className='cancel-button' >Cancelar</button>
        </div>
    </Form>
  )
}
