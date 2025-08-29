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
  const {cancel, navigate, dataTotal, setDataTotal, handleFile} = useOutletContext();

  const [dataStep1, setDataStep1] = useState(initialValue);

  useEffect(()=>{
            setDataStep1({event_title: dataTotal.event_title, event_description:dataTotal.event_description, location: dataTotal.location, type_event: dataTotal.type_event})
  }, [])

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
    <div>
      <Form className='w-75 border border-2 p-4 rounded rounded-3'>
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
          {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescEvent">
          <Form.Label>Descripción del Evento/Taller:</Form.Label>
          <Form.Control as="textarea" rows={3}
            placeholder="Resumen del evento/taller"
            onChange={handleChange}
            value={dataStep1.event_description}
            name="event_description"
          />
          {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
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
          {/* {valError.who_can_use_it && <Form.Text className="text-danger fw-bold">{valError.who_can_use_it}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoverFile">
          <Form.Label>Subir imagen de portada:</Form.Label>
          <Form.Control 
            type="file"
            onChange={handleFile}
            hidden
            name="cover_image"
          />
          {/* {valError.who_can_use_it && <Form.Text className="text-danger fw-bold">{valError.who_can_use_it}</Form.Text>}
          {msgError && <Form.Text className="text-danger fw-bold">{msgError}</Form.Text>} */}
        </Form.Group>
          <div className='d-flex flex-column flex-md-row gap-2'>
            <button className='cancel-button' onClick={cancel}>Cancelar</button>
            <button className='submit-button' onClick={nextForm}>Siguiente</button>
          </div>
      </Form>
    </div>
  )
}

export default Step1;