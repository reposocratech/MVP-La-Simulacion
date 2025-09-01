import { Container } from "react-bootstrap";
import { CardEvents } from "../../../components/Cards/cardEvents/CardEvents";
import './events.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchData } from "../../../helpers/axiosHelper";
import { ImCalendar } from "react-icons/im";

const Events = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async() => {
      try {
        const res = await fetchData("/events/futures", "get");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <section className="section-events">
      <Container>
        <h1><span>EV</span>Próximos eventos y talleres</h1>
        <div className="d-flex justify-content-center pb-4"><button className="edit-button" onClick={()=>navigate('/calendar')}><ImCalendar className="me-2"/>Visita nuestro calendario</button></div>
        <div className="d-flex flex-column align-items-center gap-4">
          {events?.map(event => (
            <div key={event.event_id} className="w-75">
              <CardEvents event={event}/>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Events;
