import { useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { Sections } from "./Sections";

const initialValue = {
  section_title: "",
  section_subtitle: "",
  section_description: "",
  section_duration: "",
  key_points: []
}

const NewSection = () => {
  const {cancel, navigate, dataTotal, setDataTotal, handleSectionFile, terminar} = useOutletContext();

  const [newSection, setNewSection] = useState(initialValue);
  const [sectionImages, setSectionImages] = useState();
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewSection({...newSection, [name]: value});
  }

  const handleFile = (e) => {
    setSectionImages(e.target.files);
  }

  const addSection = (e) => {
    e.preventDefault();
    let sec_id = Date.now();
    setDataTotal({...dataTotal, sections: [...dataTotal.sections, {...newSection, sec_id}]});
    setNewSection(initialValue);
    handleSectionFile(sec_id, sectionImages);
    setShowForm(false);
  }

  //console.log("DATATOTAL SECT", dataTotal);

  const cancelAddSection = (e) => {
    e.preventDefault();
    setNewSection(initialValue);
    setShowForm(false);
  }

  return (
    <div>
      {showForm ?
        <Form className='border border-2 p-3 rounded-4'>
          <h4>Nueva sección</h4>
          <div className="d-flex justify-content-center gap-3">
            <Form.Group className="mb-3 w-100" controlId="formBasicSectTitle">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título de sección"
                onChange={handleChange}
                value={newSection.section_title}
                name="section_title"
              />
              {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
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
              {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
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
            {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
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
            {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
          </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSectFiles">
            <Form.Label>Subir Imágenes</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFile}
              name="sectionImages"
            />
            {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
          </Form.Group>
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
          <div className='mb-5 d-flex flex-column flex-md-row gap-2'>
            <button 
              className='submit-button' 
              disabled={showForm} 
              onClick={()=>navigate('step3')} 
            >Anterior</button>
            <button
              className="lavender-button"
              onClick={()=>setShowForm(true)}
            >Añadir Sección</button>
            <button 
              className='cancel-button' 
              disabled={showForm} 
              onClick={cancel}
            >Cancelar</button>
            <button 
              className='submit-button' 
              disabled={showForm} 
              onClick={terminar}
            >Terminar</button>
          </div>
          <Sections dataTotal={dataTotal} setDataTotal={setDataTotal}/>
        </>
      }
    </div>
  )
}

export default NewSection;
