import { Col, Container, Row } from 'react-bootstrap';
import errorImage from '../../../assets/error-page/img-error-404-la-simulacion.svg';
import { useNavigate } from 'react-router';
import './errorPage.css';

const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <section className="section-error d-flex align-items-center">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <article className="error-cont text-center">
              <img 
                className="img-error-page"
                src={errorImage} alt="Error 404" />
              <p 
                className="error-page-text mt-4"
                >¡UPS! PARECE QUE AQUÍ NO HAY NADA
              </p>
              <button 
                className="error-page-button"
                onClick={()=>navigate("/")}
                >Volver a la web
              </button>
            </article>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ErrorPage;
