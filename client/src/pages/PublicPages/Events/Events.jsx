import { Container } from "react-bootstrap";
import { CardEvents } from "../../../components/Cards/cardEvents/CardEvents";
import "./events.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchData } from "../../../helpers/axiosHelper";
import { ImCalendar } from "react-icons/im";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState("future");
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetchData("/events/events", "get");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  const today = new Date();

  const futureEvents = events
    .filter((e) => new Date(e.start_date) >= today)
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

  const pastEvents = events
    .filter((e) => new Date(e.end_date) < today)
    .sort((a, b) => new Date(b.end_date) - new Date(a.end_date)); 

  const eventsToShow = eventType === "future" ? futureEvents : pastEvents;

  return (
    <section className="section-events">
      <Container>
        <h1>
          <span>EV</span>{" "}
          {eventType === "future"
            ? "Próximos eventos y talleres"
            : "Eventos pasados"}
        </h1>

        <div className="mb-4 d-flex gap-3 justify-content-center">
          <button
            className={"button-event"}
            onClick={() => setEventType("future")}
          >
            Próximos eventos
          </button>
          <button
            className={"button-event"}
            onClick={() => setEventType("past")}
          >
            Eventos pasados
          </button>
          <button 
            className="edit-button" 
            onClick={()=>navigate('/calendar')}
          ><ImCalendar className="me-2"/>Visita nuestro calendario</button>
        </div>

        <div className="d-flex flex-column align-items-center gap-4">
          {eventsToShow.length > 0 ? (
            eventsToShow.map((event) => (
              <div key={event.event_id} className="w-75">
                <CardEvents event={event} navigate={navigate} />
              </div>
            ))
          ) : (
            <p>
              No hay eventos {eventType === "future" ? "próximos" : "pasados"}{" "}
              disponibles.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Events;
