import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { validateForms } from "../../helpers/validateForms";
import { eventStep2Schema } from "../../schemas/createEventStep2Schema";

const initialValue = {
  duration: "",
  start_date: "",
  end_date: "",
  start_hour: "",
  end_hour: "",
  number_of_attendees: "",
  price: "",
  ticket_link: ""
}

const Step2 = () => {
  const {cancel, navigate, dataTotal, setDataTotal, valError, setValError, msgError, setMsgError} = useOutletContext();

  const [dataStep2, setDataStep2] = useState(initialValue);

  useEffect(()=>{
    setDataStep2({
      duration: dataTotal.duration,
      start_date: dataTotal.start_date,
      end_date: dataTotal.end_date,
      start_hour: dataTotal.start_hour,
      end_hour: dataTotal.end_hour,
      number_of_attendees: dataTotal.number_of_attendees,
      price: dataTotal.price,
      ticket_link: dataTotal.ticket_link
    })
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataStep2({...dataStep2, [name]: value});
  };


  const prevForm = (e) => {
    e.preventDefault();
    setDataTotal({...dataTotal, ...dataStep2});
    navigate('/admin/createEvent');
  }

  const nextForm = (e) => {
    e.preventDefault();

    try {
      const { valid, errors } = validateForms(eventStep2Schema, dataStep2);
      setValError(errors);

      if(valid) {
        setDataTotal({...dataTotal, ...dataStep2});
        navigate('step3');
        setValError({});
      }
    } catch (error) {
      console.log(error);
      setMsgError('Algo salió mal, inténtelo de nuevo');
    }
  }

  return (
    <>
      <Form className="border-forms">
        <h2 className="fs-3 mb-3">Datos adicionales</h2>
        <Form.Group className="mb-3" controlId="formBasicDurationEvent">
          <Form.Label>Duración Total:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ejemplo: 8 horas, 2 días, 3 semanas, 1h..."
            onChange={handleChange}
            value={dataStep2.duration}
            name="duration"
          />
          {valError.duration && <Form.Text className="text-danger fw-bold">{valError.duration}</Form.Text>}
        </Form.Group>
        <div className="d-flex justify-content-center gap-2 column-gap-2 flex-column flex-lg-row">
          <Form.Group className="mb-3 w-100" controlId="formBasicStartDate">
            <Form.Label>Fecha de inicio:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={dataStep2.start_date ? dataStep2.start_date : ""}
              name="start_date"
            />
            {valError.start_date && <Form.Text className="text-danger fw-bold">{valError.start_date}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndDate">
            <Form.Label>Fecha de fin:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={dataStep2.end_date ? dataStep2.end_date : ""}
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
              value={dataStep2.start_hour? dataStep2.start_hour : ""}
              name="start_hour"
            />
            {valError.start_hour && <Form.Text className="text-danger fw-bold">{valError.start_hour}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndHour">
            <Form.Label>Hora de fin:</Form.Label>
            <Form.Control
              type="time"
              onChange={handleChange}
              value={dataStep2.end_hour ? dataStep2.end_hour : ""}
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
            value={dataStep2.number_of_attendees}
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
            value={dataStep2.price}
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
            value={dataStep2.ticket_link}
            name="ticket_link"
          />
          {valError.ticket_link && <Form.Text className="text-danger fw-bold">{valError.ticket_link}</Form.Text>}
        </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='d-flex flex-column flex-md-row gap-3'>
          <button className='prev-button' onClick={prevForm} >Anterior</button>
          <button className='cancel-button' onClick={cancel}>Cancelar</button>
          <button className='submit-button' onClick={nextForm}>Siguiente</button>
        </div>
      </Form>
    </>
  )
}

export default Step2;

