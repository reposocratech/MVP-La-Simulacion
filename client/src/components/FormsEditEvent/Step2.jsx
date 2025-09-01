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
  const {cancel, navigate, dataTotal, setDataTotal, valError, setValError, msgError, setMsgError, id} = useOutletContext();

  //const [dataStep2, setDataStep2] = useState(initialValue);
  
  /* useEffect(()=>{
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
  }, []) */

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataTotal((prevData) => ({...prevData, [name]: value}));
  };


  const prevForm = (e) => {
    e.preventDefault();
    setDataTotal(dataTotal);
    navigate(`/admin/editEvent/${id}`);
  }

  const nextForm = (e) => {
    e.preventDefault();

    try {
      //const { valid, errors } = validateForms(eventStep2Schema, dataStep2);
      //setValError(errors);

      /* if(valid) {
        setDataTotal({...dataTotal, ...dataStep2});
        navigate('step3');  
      } */
      navigate('step3');
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
            value={dataTotal.duration}
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
              value={dataTotal.start_date}
              name="start_date"
            />
            {valError.start_date && <Form.Text className="text-danger fw-bold">{valError.start_date}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndDate">
            <Form.Label>Fecha de fin:</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={dataTotal.end_date}
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
              value={dataTotal.start_hour}
              name="start_hour"
            />
            {valError.start_hour && <Form.Text className="text-danger fw-bold">{valError.start_hour}</Form.Text>}
          </Form.Group>
          <Form.Group className="mb-3 w-100" controlId="formBasicEndHour">
            <Form.Label>Hora de fin:</Form.Label>
            <Form.Control
              type="time"
              onChange={handleChange}
              value={dataTotal.end_hour}
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
            value={dataTotal.number_of_attendees}
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
            value={dataTotal.price}
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
            value={dataTotal.ticket_link}
            name="ticket_link"
          />
          {valError.ticket_link && <Form.Text className="text-danger fw-bold">{valError.ticket_link}</Form.Text>}
        </Form.Group>
        {msgError && <p className="text-danger">{msgError}</p>}
        <div className='d-flex flex-column flex-md-row gap-3'>
          <button className='submit-button' onClick={prevForm} >Anterior</button>
          <button className='cancel-button' onClick={cancel}>Cancelar</button>
          <button className='submit-button' onClick={nextForm}>Siguiente</button>
        </div>
      </Form>
    </>
  )
}

export default Step2;

