import { Modal } from 'react-bootstrap';

export const ModalWarning = ({handleClose, show, onSubmit, title, text}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <button className='btn-table block' onClick={handleClose}>
          Cancelar
        </button>
        <button className='btn-table unblock' onClick={onSubmit}>
          Aceptar
        </button>
      </Modal.Footer>
    </Modal>
  )
}
