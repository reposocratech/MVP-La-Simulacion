import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchData } from '../../../helpers/axiosHelper'
import EventHeader from '../../../components/Events/EventHeader'
import EventSection from '../../../components/Events/EventSection'
import './oneEvent.css'
import { Rating } from 'react-simple-star-rating'

const OneEvent = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [sections, setSections] = useState([]);
  const [reviews, setReviews] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetchData(`/events/event/${id}`, 'get')
        console.log("res", res);
        setEvent(res.data)
        setSections(res.data.sections || [])
        const res2 = await fetchData(`/reviews/seeaveragerating/${id}` , "get")
        setReviews(res2.data.result[0])
        console.log("res2" , res2.data.result);      
      } catch (error){
        console.log(error);
      }
    }
    loadEvent()
  }, [id]);

  console.log("+++++", event);

  const today = new Date();
  const timeEvent = event && new Date(event.start_date) >= today;

  return (
    <section className="section-one-event">
      <Container>
        <EventHeader event={event} timeEvent={timeEvent} />

        {event?.event_description && (
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
          {reviews && reviews.total_reviews > 0 && (
          <div className="event-reviews my-4">
          <h5>Opiniones del evento</h5>
          <Rating
          initialValue={reviews.average_rating}
          size={20}
          fillColor="var(--color-primary-violet)"
          emptyColor="#CCC"
          readonly
          />                
          <p>{reviews.total_reviews}</p>
          </div>
        )}

        
        {event?.ticket_link && (
          <div className="text-center my-4">
           {timeEvent ? (
            <a
              href={event.ticket_link}
              target="_blank"
              rel="noopener noreferrer"
              className="submit-button text-decoration-none"
            >
              Apúntate al evento
            </a>
          ) : <button onClick={() => navigate(`/review/${id}`)} className='submit-button'>Dejanos Tu opinión</button>
          }
          </div>
        )}
      </Container>
    </section>
  )
}

export default OneEvent;