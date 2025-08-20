import { Form } from 'react-bootstrap'

export const FormRoom2 = ({room, setRoom, handleChange, cancel, previous, handleFile, onSubmit}) => {

  return (
    <section>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPricing">
            <Form.Label>Precios:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Precios del alquiler de la sala y de los extras que pueda tener"
              onChange={handleChange}
              value={room.pricing}
              name="pricing"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUsage_Policy">
            <Form.Label>Política y condiciones de uso:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Política, condiciones, normas..."
              onChange={handleChange}
              value={room.usage_policy}
              name="usage_policy"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Label>Subir imágenes a la sala </Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleFile}
              name="file"
              hidden
            />
          </Form.Group>
            <button onClick={previous}>Anterior</button>
            <button onClick={cancel}>Cancelar</button>
            <button onClick={onSubmit}>Siguiente</button>
        </Form>
      </section>
  )
}
