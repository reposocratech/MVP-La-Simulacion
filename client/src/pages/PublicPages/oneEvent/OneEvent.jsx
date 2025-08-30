import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchData } from '../../../helpers/axiosHelper'
import EventHeader from '../../../components/Events/EventHeader'
import EventSection from '../../../components/Events/EventSection'
import './oneEvent.css'

const OneEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetchData(`/events/event/${id}`, 'get')
        setEvent(res.data.event)
        setSections(res.data.sections || [])
      } catch {
        setError('Error al cargar el evento')
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [id])

  if (loading) return <p className="text-center my-5">Cargando evento...</p>
  if (error) return <p className="text-center my-5 text-danger">{error}</p>

  return (
    <section className="section-one-event">
      <Container>
        <EventHeader event={event} />
        {event.event_description && (
          <div className="event-description">
            <p>{event.event_description}</p>
          </div>
        )}
        {sections.map((section, idx) => (
          <EventSection
            key={`${section.section_id}-${idx}`}
            section={section}
            index={idx}
          />
        ))}

        {event.ticket_link && (
          <div className="text-center my-4">
            <a
              href={event.ticket_link}
              target="_blank"
              rel="noopener noreferrer"
              className="submit-button text-decoration-none"
            >
              Apúntate al evento
            </a>
          </div>
        )}
      </Container>
    </section>
  )
}

export default OneEvent
