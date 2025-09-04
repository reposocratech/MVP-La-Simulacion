import { useState } from 'react'
import { Form } from 'react-bootstrap';

export const EditDataEvent = ({dataEvent, onSubmit, cancel, valError, msgError, fileError, setFileError}) => {
  const [eventToEdit, setEventToEdit] = useState({...dataEvent});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEventToEdit({...eventToEdit, [name]: value});
  }

  const handleFile = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile);

    if (selectedFile && selectedFile.name.length > 200) {
      setFileError(`El nombre de alguno de tus archivos es demasiado largo (máximo 200 caracteres).`);
      e.target.value = null;
      return;
    }

    setFileError(null); 
  }
  
  return (
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
              checked={String(eventToEdit.type_event) === "1"}
            />
            <Form.Check
              type="radio"
              id="type-workshop"
              onChange={handleChange}
              name="type_event"
              label="Taller"
              value="2"
              checked={String(eventToEdit.type_event) === "2"}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEventTitle">
          <Form.Label>Título del Evento/Taller:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título del evento/taller"
            onChange={handleChange}
            value={eventToEdit.event_title}
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
            value={eventToEdit.event_description}
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
            value={eventToEdit.location}
            name="location"
          />
          {valError.location && <Form.Text className="text-danger fw-bold">{valError.location}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCoverFile">
          <Form.Label className="text-decoration-underline">Cambiar imagen de portada</Form.Label>
          <Form.Control 
            type="file"
            onChange={handleFile}
            hidden
            name="cover_image"
            accept="image/*"
          />
          {fileError && <Form.Text className="text-danger fw-bold ms-3">{fileError}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDurationEvent">
          <Form.Label>Duración Total:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ejemplo: 8 horas, 2 días, 3 semanas, 1h..."
            onChange={handleChange}
            value={eventToEdit.duration ? eventToEdit.duration : ""}
            name="duration"
          />
          {valError.duration && <Form.Text className="text-danger fw-bold">{valError.duration}</Form.Text>}
        </Form.Group>
        <div className="d-flex justify-content-center gap-3">
          <Form.Group className="mb-3 w-100" controlId="formBasicStartDate">
            <Form.Label>Fecha de inicio:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={eventToEdit.start_date ? eventToEdit.start_date : ""}
              name="start_date"
            />
            {valError.start_date && <Form.Text className="text-danger fw-bold">{valError.start_date}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndDate">
            <Form.Label>Fecha de fin:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={eventToEdit.end_date ? eventToEdit.end_date : ""}
              name="end_date"
            />
            {valError.end_date && <Form.Text className="text-danger fw-bold">{valError.end_date}</Form.Text>}
          </Form.Group>
        </div>
        <div className="d-flex justify-content-center gap-3">
          <Form.Group className="mb-3 w-100" controlId="formBasicStartHour">
            <Form.Label>Hora de inicio:</Form.Label>
            <Form.Control
              type="time"
              onChange={handleChange}
              value={eventToEdit.start_hour ? eventToEdit.start_hour : ""}
              name="start_hour"
            />
            {valError.start_hour && <Form.Text className="text-danger fw-bold">{valError.start_hour}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndHour">
            <Form.Label>Hora de fin:</Form.Label>
            <Form.Control
              type="time"
              onChange={handleChange}
              value={eventToEdit.end_hour ? eventToEdit.end_hour : ""}
              name="end_hour"
            />
            {valError.end_hour && <Form.Text className="text-danger fw-bold">{valError.end_hour}</Form.Text>}
          </Form.Group>
        </div>
          <Form.Group className="mb-3" controlId="formBasicAttendees">
          <Form.Label>Número de asistentes:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Núm. asistentes"
            onChange={handleChange}
            value={eventToEdit.number_of_attendees ? eventToEdit.number_of_attendees : ""}
            name="number_of_attendees"
          />
          {valError.number_of_attendees && <Form.Text className="text-danger fw-bold">{valError.number_of_attendees}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Coste total:</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Coste total en números"
            onChange={handleChange}
            value={eventToEdit.price ? eventToEdit.price : ""}
            name="price"
          />
          {valError.price && <Form.Text className="text-danger fw-bold">{valError.price}</Form.Text>}
        </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicTicketLink">
          <Form.Label>Enlace ticketera:</Form.Label>
          <Form.Control
            type="text"
            placeholder="www.ticketera.com"
            onChange={handleChange}
            value={eventToEdit.ticket_link ? eventToEdit.ticket_link : ""}
            name="ticket_link"
          />
          {valError.ticket_link && <Form.Text className="text-danger fw-bold">{valError.ticket_link}</Form.Text>}
        </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='d-flex gap-3'>
          <button className='cancel-button' onClick={cancel} type='button'>Cancelar</button>
          <button className='submit-button' onClick={() => onSubmit(eventToEdit, file)} type='button'>Aceptar</button>
        </div>
      </Form>
  )
}
