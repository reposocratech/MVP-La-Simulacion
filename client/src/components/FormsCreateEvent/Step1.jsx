import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";

const initialValue = {
  event_title: "",
  event_description: "",
  location: "",
  type_event: ""
}

const Step1 = () => {
  const {cancel, navigate, dataTotal, setDataTotal, handleFile, valError, msgError, fileError} = useOutletContext();

  const [dataStep1, setDataStep1] = useState(initialValue);

  useEffect(()=>{
    setDataStep1({event_title: dataTotal.event_title, event_description:dataTotal.event_description, location: dataTotal.location, type_event: dataTotal.type_event})
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataStep1({...dataStep1, [name]: value});
  }

  const nextForm = (e) => {
    e.preventDefault();
    setDataTotal({...dataTotal, ...dataStep1});
    navigate('step2');
  }

  return (
    <>
      <Form className="border-forms">
        <h2 className="fs-3 mb-3">Datos generales</h2>
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>Tipo:</Form.Label>
          <div className="d-flex gap-4">
            <Form.Check
              type="radio"
              id="type-event"
              onChange={handleChange}
              name="type_event"
              label="Evento"
              value="1"
              checked={dataStep1.type_event === "1"}
            />
            <Form.Check
              type="radio"
              id="type-workshop"
              onChange={handleChange}
              name="type_event"
              label="Taller"
              value="2"
              checked={dataStep1.type_event === "2"}
            />
          </div>
          {valError.type_event && <Form.Text className="text-danger fw-bold">{valError.type_event}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEventTitle">
          <Form.Label>Título del Evento/Taller:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título del evento/taller"
            onChange={handleChange}
            value={dataStep1.event_title}
            name="event_title"
          />
          {valError.event_title && <Form.Text className="text-danger fw-bold">{valError.event_title}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescEvent">
          <Form.Label>Descripción del Evento/Taller:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3}
            placeholder="Descripción del evento/taller"
            onChange={handleChange}
            value={dataStep1.event_description}
            name="event_description"
          />
          {valError.event_description && <Form.Text className="text-danger fw-bold">{valError.event_description}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLocation">
          <Form.Label>Localización:</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Lugar donde se celebra el evento/taller"
            onChange={handleChange}
            value={dataStep1.location}
            name="location"
          />
          {valError.location && <Form.Text className="text-danger fw-bold">{valError.location}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoverFile">
          <Form.Label className="text-decoration-underline">Subir imagen de portada</Form.Label>
          <Form.Control 
            type="file"
            onChange={handleFile}
            hidden
            name="cover_image"
            accept="image/*"
          />
          {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
        </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='d-flex gap-3'>
          <button className='cancel-button' onClick={cancel}>Cancelar</button>
          <button className='submit-button' onClick={nextForm}>Siguiente</button>
        </div>
      </Form>
    </>
  )
}

export default Step1;