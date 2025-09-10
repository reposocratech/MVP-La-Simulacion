import { Row, Col } from 'react-bootstrap';
import './cardEvents.css';

export const CardEvents = ({event , navigate}) => {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '')
  const startday = formatDate(event.start_date)
  const endday = formatDate(event.end_date)
  return (
    <article className='card-event rounded-4 overflow-hidden'>
        <Row>
          <Col lg={7}>
            <div className="p-3 pt-2 d-flex flex-column justify-content-between">
              <h4 className='mb-3'>{event.event_title}</h4>
              <p>
                {event.event_description}
              </p>
              <p>{startday} - {endday}</p>
              <p className='fst-italic'>
                {event.location}
              </p>
              <div>
                <button onClick={() => navigate(`/event/${event.event_id}`)} className='info-button'>Mas información</button>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/events/${
              event.cover_image
            }`} alt="" className='cover-img-events w-100 object-fit-cover'/>
          </Col>
        </Row>
    </article>
  )
}
