import brilloRosa from '../../assets/decorative/brillo-rosa.png'
import trebolVerde from '../../assets/decorative/trebol-verde.svg'
import florRedondeada from '../../assets/decorative/flor-redondeada.svg'

//evento foto cabecera titulo e informacion basica del evento con boton de ticketera
const EventHeader = ({ event }) => {
  if (!event) return null

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '')
  const formatTime = (t) => (t ? t.substring(0, 5) : '')

  const startDate = formatDate(event.start_date)
  const endDate = formatDate(event.end_date)
  const dateText =
    startDate && endDate && startDate !== endDate
      ? `${startDate} – ${endDate}`
      : startDate || ''

  const startTime = formatTime(event.start_hour)
  const endTime = formatTime(event.end_hour)
  const timeText =
    startTime && endTime ? `${startTime} – ${endTime}` : startTime || ''

  const durationText = event.duration || ''
  const aforoText = event.number_of_attendees
    ? `${event.number_of_attendees} personas`
    : ''
  const priceText =
    event.price !== undefined && event.price !== null
      ? `${Number(event.price).toFixed(2)} €`
      : ''

  return (
    <header className="event-header">
      <div className="cover-container">
        {event.cover_image && (
          <img
            src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/events/${
              event.cover_image
            }`}
            alt=""
            className="cover-image"
          />
        )}
        <img src={brilloRosa} alt="" className="decor decor-brillo" />
        <img src={trebolVerde} alt="" className="decor decor-trebol" />
        <img src={florRedondeada} alt="" className="decor decor-flor" />
      </div>
      <h2 className="event-title">{event.event_title}</h2>
      <div className="event-info">
        <ul className="event-info-list">
          {dateText && (
            <li>
              <strong>Fecha:</strong> {dateText}
            </li>
          )}
          {timeText && (
            <li>
              <strong>Horario:</strong> {timeText}
            </li>
          )}
          {durationText && (
            <li>
              <strong>Duración:</strong> {durationText}
            </li>
          )}
          {aforoText && (
            <li>
              <strong>Aforo:</strong> {aforoText}
            </li>
          )}
          {event.location && (
            <li>
              <strong>Ubicación:</strong> {event.location}
            </li>
          )}
          {priceText && (
            <li>
              <strong>Precio:</strong> {priceText}
            </li>
          )}
        </ul>
      </div>
      {event.ticket_link && (
        <div className="cta-wrapper">
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
    </header>
  )
}

export default EventHeader
