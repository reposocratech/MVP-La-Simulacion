import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';

// const initialValue = {
//   section_title: "",
//   section_subtitle: "",
//   section_description: "",
//   section_duration: ""
// }

export const EditDataSection = ({dataSections, selectedSectionId, onSubmit, cancel, valError, msgError}) => {
  const [sectionToEdit, setSectionToEdit] = useState();

  useEffect(() => {
    setSectionToEdit(dataSections.find(elem => elem.section_id === selectedSectionId)); 
  }, []);

  // useEffect(() => {
  //   const foundSection = dataSections.find(elem => elem.section_id === selectedSectionId);
  //   if (foundSection) { // Se asegura de que se encuentre la sección antes de actualizar el estado
  //     setSectionToEdit(foundSection); 
  //   }
  // }, [dataSections, selectedSectionId]);

  // useEffect(() => {
  //       // En cada cambio de `dataSections` o `selectedSectionId`, se actualiza el estado.
  //       const foundSection = dataSections.find(elem => elem.section_id === selectedSectionId);
  //       // Si se encuentra la sección, se actualiza el estado.
  //       // Si no se encuentra, el estado se mantiene como el objeto vacío, o puedes reiniciar los campos.
  //       if (foundSection) {
  //           setSectionToEdit(foundSection);
  //       }
  //   }, [dataSections, selectedSectionId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setSectionToEdit({...sectionToEdit, [name]: value});
  }

  return (
    <Form className='border-forms'>
      <h4>Editar sección</h4>
      <div className="d-flex justify-content-center gap-3">
        <Form.Group className="mb-3 w-100" controlId="formBasicSectTitle">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título de sección"
            onChange={handleChange}
            value={sectionToEdit?.section_title ? sectionToEdit.section_title : ""}
            name="section_title"
          />
          {valError.section_title && <Form.Text className="text-danger fw-bold">{valError.section_title}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3 w-100" controlId="formBasicSectSubTitle">
          <Form.Label>Subtítulo:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subtítulo de sección"
            onChange={handleChange}
            value={sectionToEdit?.section_subtitle ? sectionToEdit.section_subtitle : ""}
            name="section_subtitle"
          />
          {valError.section_subtitle && <Form.Text className="text-danger fw-bold">{valError.section_subtitle}</Form.Text>}
        </Form.Group>
      </div>

      <Form.Group className="mb-3" controlId="formBasicSectDesc">
        <Form.Label>Descripción:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descripción de sección"
          onChange={handleChange}
          value={sectionToEdit?.section_description ? sectionToEdit.section_description : ""}
          name="section_description"
        />
        {valError.section_description && <Form.Text className="text-danger fw-bold">{valError.section_description}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSectDuration">
        <Form.Label>Duración:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Duración de sección"
          onChange={handleChange}
          value={sectionToEdit?.section_duration ? sectionToEdit.section_duration : ""}
          name="section_duration"
        />
        {valError.section_duration && <Form.Text className="text-danger fw-bold">{valError.section_duration}</Form.Text>}
      </Form.Group>
      {msgError && <p className="text-danger">{msgError}</p>}
      <div className="d-flex gap-3">
        <button
          className="btn-table block"
          type='button'
          onClick={cancel}
        >Cancelar</button>
        <button
          className="btn-table unblock"
          type='button'
          onClick={() => onSubmit(sectionToEdit)}
        >Aceptar</button>
      </div>
    </Form>
  )
}
