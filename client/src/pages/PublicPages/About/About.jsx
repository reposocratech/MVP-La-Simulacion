import { Container } from "react-bootstrap";

import './about.css';

const About = () => {
  return (
    <>
      <section className="section-about-1 pt-5">
        <Container>
          <h1>
            <span className="spanLetter-1 accent-text">A
            </span>Historia de la Asociación
          </h1>
        </Container>
      </section>
      <section className="section-about-2 pt-5">
        <Container>
          <h2>
            <span className="spanLetter-2 accent-text">H
            </span>Historia de la Cooperativa
          </h2>
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
