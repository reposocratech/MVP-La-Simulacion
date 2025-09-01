import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { validateForms } from "../../helpers/validateForms";
import { createEventStep1Schema } from "../../schemas/createEventStep1Schema";

const initialValue = {
  event_title: "",
  event_description: "",
  location: "",
  type_event: ""
}

const Step1 = () => {
  const {cancel, navigate, dataTotal, setDataTotal, handleFile, fileError} = useOutletContext();

  const [dataStep1, setDataStep1] = useState(initialValue);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  useEffect(()=>{
    setDataStep1({event_title: dataTotal.event_title, event_description:dataTotal.event_description, location: dataTotal.location, type_event: dataTotal.type_event})
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataStep1({...dataStep1, [name]: value});
  }

  const nextForm = (e) => {
    e.preventDefault();

    try {
      const { valid, errors } = validateForms(createEventStep1Schema, dataStep1);
      setValError(errors);

      if(valid) {
        setDataTotal({...dataTotal, ...dataStep1});
        navigate('step2');  
      }

    } catch (error) {
      console.log(error);
      setMsgError('Algo  mal, inténtelo de nuevo');
    }
  }

  return (
    <Form className="p-3 border border-2 rounded-4">
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
          placeholder="Resumen del evento/taller"
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
        <Form.Label>Subir imagen de portada:</Form.Label>
        <Form.Control 
          type="file"
          onChange={handleFile}
          hidden
          name="cover_image"
        />
        {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
      </Form.Group>
      {msgError && <p className="text-danger">{msgError}</p>}
      <div className='d-flex gap-2'>
        <button className='cancel-button' onClick={cancel}>Cancelar</button>
        <button className='submit-button' onClick={nextForm}>Siguiente</button>
      </div>
    </Form>
  )
}

export default Step1;