import { Button, Modal } from "react-bootstrap"

export const ModalKeyPoints = ({show, handleClose, onSubmit, keyPoint, handleChange}) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
        <div>
          <label htmlFor="">nombre</label>
          <input 
            type="text" 
            name="key_point_title" 
            value={keyPoint.key_point_title}
            onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="">Descripción</label>
          <input 
            type="text" 
            name="key_point_description" 
            value={keyPoint.key_point_description}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={onSubmit}>Aceptar</button>
        <button type="button" onClick={handleClose}>cancelar</button>
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
