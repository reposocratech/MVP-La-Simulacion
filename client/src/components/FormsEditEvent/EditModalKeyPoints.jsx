import { Form, Modal } from "react-bootstrap";

export const EditModalKeyPoints = ({show, handleClose, onSubmit, keyPoint, handleChange, valError, msgError}) => {

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
              {valError.key_point_title && <p className="text-danger fw-bold">{valError.key_point_title}</p>}
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
              {valError.key_point_description && <p className="text-danger fw-bold">{valError.key_point_description}</p>}
            </Form.Group>
            {msgError && <p className="text-danger">{msgError}</p>}
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
