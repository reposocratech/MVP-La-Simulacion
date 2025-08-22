import { Col, Container, Row } from "react-bootstrap";

import './about.css';

const About = () => {
  return (
    <>
      <section className="section-about-1 pb-5">
        <Container>
          <h1 className="text-center mb-4">
            <span className="spanLetter-1 accent-text">A 
            </span>Historia de la Asociación
          </h1>
          <Row className="gy-4">
            <Col md={6}>
              <p>
                La Simulación es una <strong>entidad cultural</strong> que busca fomentar la cultura en su localidad. Su misión es mejorar, evolucionar y renovar la estructura y las bases artísticas de la Comunidad Valenciana. Mujeres jóvenes de diversos sectores artísticos (audiovisuales, diseño gráfico, sonido, interpretación, danza...) que quieren ayudar a las personas valencianas, principalmente a los jóvenes, a <strong>desarrollar su talento</strong> sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
            </Col>
            <Col md={6}>
              <p>
                La Simulación es una entidad cultural que busca fomentar la cultura en su localidad. Su misión es mejorar, evolucionar y renovar la estructura y las bases artísticas de la Comunidad Valenciana. Mujeres jóvenes de diversos sectores artísticos (audiovisuales, diseño gráfico, sonido, interpretación, danza...) que quieren ayudar a las personas valencianas, principalmente a los jóvenes, a desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-about-2 py-5">
        <Container>
          <h2 className="text-center mb-4">
            <span className="spanLetter-2 accent-text">H 
            </span>Historia de la Cooperativa
          </h2>
          <Row className="gy-4 justify-content-center">
            
            <Col md={6} lg={4}>
              <p>
                La Simulación es una entidad cultural que busca fomentar la cultura en su localidad. Su misión es mejorar, evolucionar y renovar la estructura y las bases artísticas de la Comunidad Valenciana.
              </p>
              <p>
                Mujeres jóvenes de diversos sectores artísticos (audiovisuales, diseño gráfico, sonido, interpretación, danza...) que quieren ayudar a las personas valencianas, principalmente a los jóvenes, a desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
              <p>
                 A desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
            </Col>
            <Col md={6} lg={4}>
              <p>
                La Simulación es una entidad cultural que busca fomentar la cultura en su localidad. Su misión es mejorar, evolucionar y renovar la estructura y las bases artísticas de la Comunidad Valenciana.
              </p>
              <p>
                Mujeres jóvenes de diversos sectores artísticos (audiovisuales, diseño gráfico, sonido, interpretación, danza...) que quieren ayudar a las personas valencianas, principalmente a los jóvenes, a desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
              <p>
                 A desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
              </p>
            </Col>
            <Col md={6} lg={4}>
              <div>
                <img src="/images/imagesAbout/img01.png" alt="" className="w-100 rounded-4 shadow"/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-about-3 pt-5">
        <Container>
          <h2>
            <span className="spanLetter-3 accent-text">V 
            </span>
            Misión y visión
          </h2>
        </Container>
      </section>
      <section className="section-about-4 pt-5">
        <Container>
          <h2>
            <span className="spanLetter-4 accent-text">E 
            </span>
            Nuestro equipo
          </h2>
        </Container>
      </section>
    </>
  )
}

export default About;
