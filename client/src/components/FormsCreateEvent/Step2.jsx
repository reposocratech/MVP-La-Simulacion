import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";

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
  const {cancel, navigate, dataTotal, setDataTotal} = useOutletContext();

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
  }

  const prevForm = (e) => {
    e.preventDefault();
    setDataTotal({...dataTotal, ...dataStep2});
    navigate('/admin/createEvent');
  }

  const nextForm = (e) => {
    e.preventDefault();
    setDataTotal({...dataTotal, ...dataStep2});
    navigate('step3');
  }

  return (
    <div>
      <Form className='w-75 border border-2 p-4 rounded rounded-3'>
        <Form.Group className="mb-3" controlId="formBasicDurationEvent">
          <Form.Label>Duración Total:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Duración total"
            onChange={handleChange}
            value={dataStep2.duration}
            name="duration"
          />
          {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStartDate">
          <Form.Label>Fecha de inicio:</Form.Label>
          <Form.Control 
            type="date"
            onChange={handleChange}
            value={dataStep2.start_date}
            name="start_date"
          />
          {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEndDate">
          <Form.Label>Fecha de fin:</Form.Label>
          <Form.Control 
            type="date"
            onChange={handleChange}
            value={dataStep2.end_date}
            name="end_date"
          />
          {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicStartHour">
          <Form.Label>Hora de inicio:</Form.Label>
          <Form.Control 
            type="time"
            onChange={handleChange}
            value={dataStep2.start_hour}
            name="start_hour"
          />
          {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEndHour">
          <Form.Label>Hora de fin:</Form.Label>
          <Form.Control 
            type="time"
            onChange={handleChange}
            value={dataStep2.end_hour}
            name="end_hour"
          />
          {/* {valError.room_description && <Form.Text className="text-danger fw-bold">{valError.room_description}</Form.Text>} */}
        </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicAttendees">
          <Form.Label>Número de asistentes:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Núm. asistentes"
            onChange={handleChange}
            value={dataStep2.number_of_attendees}
            name="number_of_attendees"
          />
          {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Coste Total:</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Costa del Total"
            onChange={handleChange}
            value={dataStep2.price}
            name="price"
          />
          {/* {valError.who_can_use_it && <Form.Text className="text-danger fw-bold">{valError.who_can_use_it}</Form.Text>} */}
        </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicTicketLink">
          <Form.Label>Enlace ticketera:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Link ticketera"
            onChange={handleChange}
            value={dataStep2.ticket_link}
            name="ticket_link"
          />
          {/* {valError.room_name && <Form.Text className="text-danger fw-bold">{valError.room_name}</Form.Text>} */}
        </Form.Group>
          <div className='d-flex flex-column flex-md-row gap-2'>
            <button className='submit-button' onClick={prevForm} >Anterior</button>
            <button className='cancel-button' onClick={cancel}>Cancelar</button>
            <button className='submit-button' onClick={nextForm}>Siguiente</button>
          </div>
      </Form>
    </div>
  )
}

export default Step2;
