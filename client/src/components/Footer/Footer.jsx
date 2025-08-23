import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa";
import genkoa from '../../assets/logos/logo-genkoa-redes-negativo.png';
import { Col, Container, Row } from 'react-bootstrap';
import './footer.css';


export const Footer = () => {

  return (
    <section className="web-footer py-3 py-lg-2">
      <Container>
        <Row className="row-gap-3">
          <Col xs={12} lg={4} className="align-content-center">
            <div className="d-flex gap-4 flex-wrap justify-content-center justify-content-lg-start">
              <a 
                    href="https://www.linkedin.com/company/lasimulacion/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaLinkedin color="#FFF" size={28} title="LinkedIn" />
                  </a>
                  <a 
                    href="https://www.facebook.com/lasimulacion/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaFacebook color="#FFF" size={28} title="Facebook" />
                  </a>
                  <a 
                    href="https://www.instagram.com/la.simulacion" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaInstagram color="#FFF" size={28} title="Instagram"/>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@la.simulacion" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  ><FaTiktok color="#FFF" size={28} title="TikTok" />
                  </a>
                  <a 
                    href="https://genkoa.com/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img className="genkoa-icon"
                       src={genkoa} alt="Ir a la web de Genkoa" />
                 </a>
            </div>
          </Col>
          <Col xs={12} lg={8} className="align-content-center">
            <div className="col-texts d-flex gap-4 flex-wrap justify-content-center justify-content-lg-end">
              <p className="m-0">Política de Privacidad</p>
              <p className="m-0">Términos y condiciones</p>
              <p className="m-0">©2025 La Simulación</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
