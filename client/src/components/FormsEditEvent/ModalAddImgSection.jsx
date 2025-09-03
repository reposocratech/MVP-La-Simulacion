import { Form, Modal } from "react-bootstrap"

export const ModalAddImgSection = ({handleSectionFile, show, selectedSectionId, handleCloseFile, onSubmit, fileError}) => {
  return (
    <Modal show={show} onHide={handleCloseFile}>
        <Modal.Header closeButton>
          <Modal.Title>Añade imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h2 className="fs-5">
              Sólo puede haber un total de 3 imágenes por sección:
            </h2>
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicKeyTitle">
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleSectionFile(selectedSectionId, e)}
                name="sectionImages"
              />
            </Form.Group>
            {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
          </Form>
          </Modal.Body>
        <Modal.Footer>
          <button 
            type="button"
            onClick={handleCloseFile}
            className="btn-table block"
          >
            Cancelar
          </button>
          <button 
            type="button"
            onClick={onSubmit}
            className="btn-table unblock"
          >
            Aceptar
          </button>
        </Modal.Footer>
      </Modal>
  )
}
