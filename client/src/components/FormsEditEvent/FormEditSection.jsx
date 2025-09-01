import { useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { validateForms } from "../../helpers/validateForms";
import { createEventSectionSchema } from "../../schemas/createEventSectionSchema";
import { Sections } from "./Sections";

const initialValue = {
  section_title: "",
  section_subtitle: "",
  section_description: "",
  section_duration: "",
  key_points: []
}

export const FormEditSection = () => {
  const {cancel, navigate, dataTotal, setDataTotal, handleSectionFile, terminar, valError, setValError, msgError, setMsgError, fileError, setFileError} = useOutletContext();

  //const [newSection, setNewSection] = useState(initialValue);
  const [sectionImages, setSectionImages] = useState();
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataTotal((prevData) => ({...prevData, [name]: value}));
  }

  const handleFile =(e)=>{
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 3) {
      setFileError('Solo puedes subir un máximo de 3 imágenes.');
      e.target.value = null; 
      return; 
    }

    for (const file of selectedFiles) {
      if (file.name.length > 200) {
        setFileError(`El nombre de alguno de tus archivos es demasiado largo (máximo 200 caracteres).`);
        e.target.value = null;
        return;
      }
    }

    setFileError(null);
    setSectionImages(selectedFiles);
  }

  const addSection = (e) => {
    e.preventDefault();

    try {
      //const { valid, errors} = validateForms(createEventSectionSchema, newSection);
      //setValError(errors);

      /* if(valid) {
        let sec_id = Date.now();
        setDataTotal({...dataTotal, sections: [...dataTotal.sections, {...newSection, sec_id}]});
        setNewSection(initialValue);
        handleSectionFile(sec_id, sectionImages);
        setShowForm(false);
      } */
      let sec_id = Date.now();
        //setDataTotal({...dataTotal, sections: [...dataTotal.sections, {...newSection, sec_id}]});
        handleSectionFile(sec_id, sectionImages);
        setShowForm(false);
    } catch (error) {
      console.log(error);
      setMsgError('Algo salió mal, inténtelo de nuevo');
    }
  }

  const cancelAddSection = (e) => {
    e.preventDefault();
    setShowForm(false);
  }

  return (
    <div>
      {showForm ?
        <Form className='border-forms'>
          <h4>Nueva sección</h4>
          <div className="d-flex justify-content-center gap-3">
            <Form.Group className="mb-3 w-100" controlId="formBasicSectTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de sección"
                onChange={handleChange}
                value={dataTotal.section_title}
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
                value={newSection.section_subtitle}
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
              value={newSection.section_description}
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
              value={newSection.section_duration}
              name="section_duration"
            />
            {valError.section_duration && <Form.Text className="text-danger fw-bold">{valError.section_duration}</Form.Text>}
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSectFiles">
            <Form.Label>Subir Imágenes</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFile}
              name="sectionImages"
              accept="image/*"
            />
            {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
          </Form.Group>

          {msgError && <p className="text-danger">{msgError}</p>}
          <div className="d-flex gap-3">
            <button
              className="btn-table unblock"
              onClick={addSection}
            >Aceptar</button>
            <button
              className="btn-table block"
              onClick={cancelAddSection}
            >Cancelar</button>
          </div>
        </Form>
        :
        <>
          <div className='mb-4 d-flex flex-column flex-md-row gap-3'>
            <button 
              className='submit-button' 
              disabled={showForm} 
              onClick={()=>navigate('step3')} 
            >Anterior</button>
            <button
              className="lavender-button fw-bold"
              onClick={()=>setShowForm(true)}
            >Añadir Sección</button>
            <button 
              className='cancel-button' 
              disabled={showForm} 
              onClick={cancel}
            >Cancelar</button>
            <button 
              className='submit-button fw-bold' 
              disabled={showForm} 
              onClick={terminar}
            >Terminar</button>

          </div>
          <h2 className="fs-3 mb-3">Secciones del evento/ taller</h2>
          <Sections dataTotal={dataTotal} setDataTotal={setDataTotal}/>
        </>
      }
    </div>
  )
}

