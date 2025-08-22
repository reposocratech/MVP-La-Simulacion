import { Col, Container, Row } from "react-bootstrap";
import { CardServicios } from "../../../components/Cards/cardServicios/CardServicios";
import {services} from '../../../data/cardsServicesData';
import './services.css';

const Services = () => {
  return (
    <section className="section-services">
      <Container>
        <h1><span>O </span>Conoce nuestra oferta cultural</h1>
        <Row className="justify-content-center gy-4 gx-5">
          {services.map(service => (
            <Col  lg={6} xl={4} key={service.id}>
              <CardServicios service={service}/>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Services;
