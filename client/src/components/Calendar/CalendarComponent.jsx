import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import './CalendarComponent.css'
import { useNavigate } from 'react-router'

const API_PREFIX = `${import.meta.env.VITE_SERVER_URL}/events`

const dateKeyLocal = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const parseYMD = (ymd) => {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const groupEventsByDay = (events) => {
  const grouped = {}
  events.forEach((event) => {
    const start = parseYMD(event.start_date)
    const end = event.end_date
      ? parseYMD(event.end_date)
      : parseYMD(event.start_date)
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = dateKeyLocal(d)
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(event)
    }
  })
  return grouped
}

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [eventsByDate, setEventsByDate] = useState({})
  const [dailyEvents, setDailyEvents] = useState([])

  const loadMonthEvents = async (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    try {
      const url = `${API_PREFIX}/calendar/month/${year}/${month}`
      const response = await axios.get(url)
      const events = response.data || []
      const grouped = groupEventsByDay(events)
      setEventsByDate(grouped)
      const iso = dateKeyLocal(date)
      setDailyEvents(grouped[iso] || [])
    } catch (error) {
      console.error('Error cargando eventos', error)
    }
  }

  useEffect(() => {
    const today = new Date()
    loadMonthEvents(today)
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    const iso = dateKeyLocal(date)
    setDailyEvents(eventsByDate[iso] || [])
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const key = dateKeyLocal(date)
      if (eventsByDate[key]) return 'event-day'
    }
    return null
  }

  const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view === 'month') {
      setSelectedDate(activeStartDate)
      loadMonthEvents(activeStartDate)
    }
  }

  const handleTicketClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const navigate = useNavigate()

  return (
    <section className="container mt-5 my-4 pt-3 calendar-section">
      <div className="row g-4 calendar-grid p-3 mb-5">
        <div className="col-12 col-lg-5 pt-3 bg-white border rounded-3 mb-5">
          <Calendar
            onClickDay={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
            locale="es-ES"
            className="w-100 border-0"
            onActiveStartDateChange={handleActiveStartDateChange}
          />
        </div>
        <div className="col-12 col-lg-7">
          <div className="events-panel p-3 bg-white rounded shadow-sm">
            <h3 className="calendar-date-heading mb-3 text-uppercase text-center">
              {selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </h3>

            <div className="events-scroll">
              {dailyEvents.length === 0 ? (
                <p>No hay eventos para este día.</p>
              ) : (
                dailyEvents.map((ev) => {
                  const today = new Date()
                  const eventEnd = new Date(ev.end_date || ev.start_date)

                  const timeEvent = eventEnd >= today
                  const timeEventRew = eventEnd <= today

                  return (
                    <article className="event-card" key={ev.event_id}>
                      <h4 className="event-title mb-1 fs-3">{ev.event_title}</h4>
                      <p className="event-description mb-1">
                        {ev.event_description}
                      </p>
                      <p className="event-time mb-1">
                        <strong>Horario:</strong> {ev.start_hour?.substring(0, 5)}
                        {ev.end_hour ? ` – ${ev.end_hour.substring(0, 5)}` : ''}
                      </p>
                      <p className="event-location mb-1">
                        <strong>Ubicación:</strong> {ev.location}
                      </p>

                      <div className="d-flex flex-column flex-md-row align-items-center mt-3 gap-3">
                        <button
                          className="event-info-button boton w-100 w-md-auto"
                          onClick={() => navigate(`/event/${ev.event_id}`)}
                        >
                          Ver más información
                        </button>

                        {timeEvent && ev.ticket_link && (
                          <button
                            className="submit-button text-center boton mt-2 w-100 w-md-auto pt-2"
                            onClick={() => handleTicketClick(ev.ticket_link)}
                          >
                            Apúntate al evento
                          </button>
                        )}

                        {timeEventRew && (
                          <button
                            className="submit-button text-center  mt-2 w-100 w-md-auto"
                            onClick={() => navigate(`/review/${ev.event_id}`)}
                          >
                            Déjanos tu opinión
                          </button>
                        )}
                      </div>
                    </article>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalendarComponent
