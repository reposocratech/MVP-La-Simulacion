import { Container, Row, Col } from 'react-bootstrap'
import CalendarComponent from '../../../components/Calendar/CalendarComponent'
import './Calendar.css'
const Calendar = () => {
  return (
    <section className="calendar-page-wrapper ">
      <Container fluid>
        <Row className="justify-content-center">
          <h1 className="h1-profile text-center fw-bold" style={{ fontSize: '2.25rem' }}>
            <span className="span-profile accent-text align-middle mx-3">
              EV
            </span>
            Calendario de eventos y talleres
          </h1>

          <Col xs={12} lg={10} className="d-flex justify-content-center">
            <section className="calendar-card-section w-100">
              <CalendarComponent />
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Calendar
