import { Button, Form, Modal } from "react-bootstrap"

export const ModalKeyPoints = ({show, handleClose, onSubmit, keyPoint, handleChange}) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añade punto clave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="formBasicKeyTitle">
              <Form.Control
                type="text"
                placeholder="Título del punto clave"
                onChange={handleChange}
                value={keyPoint.key_point_title}
                name="key_point_title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicKeyDesc">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción del punto clave"
                onChange={handleChange}
                value={keyPoint.key_point_description}
                name="key_point_description"
              />
              {/* {valError.duration && <Form.Text className="text-danger fw-bold">{valError.duration}</Form.Text>} */}
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-table block"
            onClick={handleClose}
          >Cancelar</button>
          <button
            className="btn-table unblock"
            onClick={onSubmit}
          >Aceptar</button>
        </Modal.Footer>
      </Modal>
  )
}
