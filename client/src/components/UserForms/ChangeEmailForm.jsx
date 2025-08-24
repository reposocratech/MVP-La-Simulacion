import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { VscClose } from 'react-icons/vsc'

const ChangeEmailForm = ({ setActiveComponent }) => {
  return (
    <div className="form-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Cambiar email:</h2>
        <Button
          variant="link"
          onClick={() => setActiveComponent('none')}
          className="close-button"
        >
          <VscClose size={30} />
        </Button>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email actual:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nueva email:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirmar nueva email:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={() => setActiveComponent('none')}
            className="cancel-button me-2"
          >
            Cancelar
          </Button>
          <Button className="submit-button" type="submit">
            Aceptar
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ChangeEmailForm
