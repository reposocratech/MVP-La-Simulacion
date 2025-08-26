import { Container } from "react-bootstrap";
import { CustomTable } from "../../../components/Table/CustomTable";
import './adminEvents.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";

const AdminEvents = () => {
  const { token } = useContext(AuthContext);

  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async() => {
      try {
        const res = await fetchData("/admin/events", "get", null, token);
        setEventsData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvents();
  }, []);

  const deleteEvent = async(id) => {
    try {
      const values = { id };
      const res = await fetchData("/admin/deleteEvent", "put", values, token);
      setEventsData(prev => prev.filter(e => e.event_id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {key: "event_title", label: "Título"},
    {key: "location", label: "Lugar"},
    {key: "duration", label: "Duración"},
    {key: "start_date", label: "Comienza"},
    {key: "end_date", label: "Finaliza"},
    {key: "number_of_attendees", label: "Personas?"},
    {key: "price", label: "Precio"},
    /* {key: "ticket_link", label: "Ticket link"}, */
    {
      key: "actions", 
      label: "Acciones",
      render: (row) => (
        <button
          className="btn-table block"
          onClick={() => deleteEvent(row.event_id)}
        >Eliminar</button>
      )
    }
  ];

  return (
    <section className="section-admin-events">
      <Container>
        <h1><span>ET</span>Gestión de eventos y talleres</h1>

        <CustomTable
          columns={columns}
          data={eventsData}
        />
      </Container>
    </section>
  )
}

export default AdminEvents;