import { Container, Row, Col, Card } from 'react-bootstrap'
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
      } catch (error){
        console.log(error);
      }
    }
    loadEvent()
  }, [id]);


  const today = new Date();
  const timeEvent = event && new Date(event.end_date) >= today;
  const timeEventRew = event && new Date(event.start_date) >= today;


  return (
    <section className="section-one-event">
      <Container>
        <div className="mb-4">
          <EventHeader event={event} timeEvent={timeEvent} />
        </div>

        {event?.event_description && (
          <Card className="border-0 mb-4">
            <Card.Body className="text-center">
              <Card.Text className="event-description mx-auto fs-5">
                {event.event_description}
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        <Row className="g-4">
          {sections.map((section, idx) => (
            <Col xs={12} key={`${section.section_id}-${idx}`}>
              <Card className="border-0 ">
                <Card.Body>
                  <EventSection
                    section={section}
                    index={idx}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {reviews && reviews.total_reviews > 0 && (
          <Card className="border-0 shadow-sm my-4">
            <Card.Body className="text-center">
              <h5 className="mb-2">Opiniones del evento</h5>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <Rating
                  initialValue={reviews.average_rating}
                  size={20}
                  fillColor="var(--color-primary-violet)"
                  emptyColor="#CCC"
                  readonly
                />
                <span className="fw-semibold">
                  {Number(reviews.average_rating).toFixed(1)} / 5
                </span>
              </div>
              <p className="text-muted mb-0">{reviews.total_reviews} valoraciones</p>
            </Card.Body>
          </Card>
        )}

        {timeEventRew && event?.ticket_link && (
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

        {!timeEventRew && (
          <div className="text-center my-4">
            <button
              onClick={() => navigate(`/review/${id}`)}
              className=" submit-button"
            >
              Déjanos tu opinión
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

export default OneEvent
