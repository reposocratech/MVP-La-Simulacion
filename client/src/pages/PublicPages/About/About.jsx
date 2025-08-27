import { Col, Container, Row } from "react-bootstrap";
import { coopTeam } from '../../../data/teamCoopData';
import { juntaTeam } from '../../../data/teamJuntaData';
import { sociaTeam } from '../../../data/teamSociaData';
import './about.css';
import { CardTeamProfile } from "../../../components/Cards/CardTeamProfile/CardTeamProfile";

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
                La Asociación Juvenil Cinematográfica <strong>La Simulación</strong> nació en 2018 con el objetivo de crear un espacio para <strong>jóvenes artistas</strong> que no encontraban oportunidades ni recursos en Castelló. A lo largo de sus primeros años organizó proyecciones, talleres y eventos culturales de pequeño formato que pusieron en valor la importancia de <strong>lo colectivo, la autogestión y la participación ciudadana.</strong>
              </p>
            </Col>
            <Col md={6}>
              <p>
                Con el tiempo, la asociación fue ampliando su mirada más allá del audiovisual, integrando disciplinas como la música, la danza, el teatro y las artes visuales. Esta evolución consolidó a La Simulación como un referente local en el <strong>impulso del talento emergente</strong>, con proyectos que combinan formación, creación y comunidad, y siempre con el compromiso de que la cultura sea accesible para todas las personas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-about-2 py-5">
        <Container>
          <h2 className="text-center mb-4">
            <span className="spanLetter-2 accent-text">C 
            </span>Historia de la Cooperativa
          </h2>
          <Row className="gy-4 justify-content-between align-items-stretch">
            <Col md={6} lg={4}>
              <p>
                En 2025, tras varios años de experiencia con la asociación, nació la <strong>Cooperativa Cultural La Simulación.</strong>
              </p>
              <p>
                La decisión vino motivada por el deseo de dar continuidad y estabilidad a los proyectos, así como de ofrecer servicios profesionales al sector creativo sin perder la esencia comunitaria.
              </p>
              <p>
                La cooperativa amplió el marco de acción a nivel regional y estatal, fortaleciendo redes con entidades, festivales y administraciones públicas.
              </p>
            </Col>
            <Col md={6} lg={4}>
              <p>
                Desde entonces, la cooperativa se ha convertido en la estructura que permite a La Simulación sostener sus iniciativas a largo plazo.
              </p>
              <p>
                Combina la gestión de proyectos culturales con el acompañamiento a artistas y colectivos, la producción de eventos y la puesta en marcha de nuevas herramientas como <strong>Genkoa.</strong>
              </p>
              <p>
                Todo ello bajo una misma convicción: que <strong>la cultura no sea un privilegio</strong>, sino un derecho al alcance de todas las personas.
              </p>
            </Col>
            <Col md={6} lg={3}>
              <div>
                <img src="/images/imagesAbout/img01.png" alt="" className="w-100 rounded-4 shadow"/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-about-3">
        <div className="section-about-title">
          <h2>
            Misión y visión
            <span className="spanLetter-3 accent-text">MV
            </span>
          </h2>
        </div>
        <Container>
          <Row className="py-4 justify-content-around align-items-stretch gy-4">
            <Col md={5}>
              <article className="shadow">
                <h3 className="text-center">Misión</h3>
                <p>
                  Nuestra misión es acompañar y dar <strong>soporte al talento creativo desde Castelló</strong>, generando oportunidades reales de formación, producción y difusión. Lo hacemos a través de una estructura que combina la asociación y la cooperativa, para llegar tanto a <strong>artistas emergentes</strong> como a instituciones y comunidades.
                </p>
                <p>
                  Buscamos que la cultura se viva como un <b>derecho accesible</b>, fomentando espacios colectivos donde la creación, la innovación y el intercambio se conviertan en motor de transformación social y económica.
                </p>
              </article>
            </Col>
            <Col md={5}>
              <article  className="shadow">
                <h3 className="text-center">Visión</h3>
                <p>
                  Queremos consolidar a La Simulación como un referente en la <b>gestión cultural comunitaria</b>, capaz de tender puentes entre artistas, ciudadanía e instituciones. Aspiramos a fortalecer el ecosistema creativo local y su proyección en el ámbito regional, estatal e internacional.
                </p>
                <p>
                  Nuestra visión es un futuro donde el talento emergente cuente con las <b>mismas oportunidades que el profesional</b>, donde la cultura se reconozca como un bien común y donde Castelló se posicione como un territorio creativo abierto al mundo.
                </p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-about-4 py-5">
        <Container>
          <h2>
            <span className="spanLetter-4 accent-text">E
            </span>
            Nuestro equipo
          </h2>
          <div>
            <h4>Cooperativa</h4>
            <Row className="justify-content-center gx-5 gy-customsize">
              {coopTeam.map(elem => (
                <Col lg={4} key={elem.id}>
                  <CardTeamProfile data={elem}/>
                </Col>
              ))}
            </Row>
          </div>
          <div>
            <h4>Junta directiva asociación</h4>
            <Row className="justify-content-center align-items-stretch gx-5 gy-customsize">
              {juntaTeam.map(elem => (
                <Col lg={4} key={elem.id}>
                  <CardTeamProfile data={elem}/>
                </Col>
              ))}
            </Row>
          </div>
          <div>
            <h4>Socias</h4>
            <Row className="justify-content-center align-items-stretch gx-5 gy-customsize">
              {sociaTeam.map(elem => (
                <Col lg={4} key={elem.id}>
                  <CardTeamProfile data={elem}/>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default About;
