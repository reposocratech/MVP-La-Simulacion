import { Col, Container, Row } from 'react-bootstrap';
import circle from '../../../assets/decorative/circulo-con-flor.svg';
import { CardHome } from '../../../components/Cards/CardHome/CardHome';

import './home.css';

const cardsData = [
  {   
    id: 1, 
    title: "Nuestros servicios",
    textButton: "Más info",
    color: "#F0B9D9", 
    urlButton: "/servicesCoop",
    textBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    accentLetter: "S",
   },
  {
    id: 2,
    title: "Eventos y Talleres",
    textButton: "Más info",
    color: "#B4D380", 
    urlButton: "/events",
    textBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    accentLetter: "E"
  },
  {
    id: 3,
    title: "Set de Grabación",
    textButton: "Más info",
    color: "#D890EA",
    urlButton: "/rooms",
    textBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    accentLetter: "G"
  }
];

const Home = () => {

  return (
    <>
      <section className="section-home-1">
        <Container>
          <Row>
            <Col xs={12} lg={7} className="pt-5">
              <h1 className="pt-2 pb-3">Resumen de la organización</h1>
              <article>
                <p>
                  La Simulación es una entidad cultural que busca fomentar la cultura en su localidad. Su misión es mejorar, evolucionar y renovar la estructura y las bases artísticas de la Comunidad Valenciana. Mujeres jóvenes de diversos sectores artísticos (audiovisuales, diseño gráfico, sonido, interpretación, danza...) que quieren ayudar a las personas valencianas, principalmente a los jóvenes, a desarrollar su talento sin necesidad de irse a localidades más potentes en su ámbito artístico.
                  </p>
              </article>
            </Col>
            <Col xs={12} lg={5} className='d-flex justify-content-center justify-content-lg-end'>
              <div className="images-container pe-0 pe-lg-3">
                <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/static/img-portada-home-01.png`} alt="" className="img-home"/>
                <img src={circle} alt="" className='circle'/>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-home-2 pt-5">
        <Container>
          <h2 className="text-center py-4 pt-lg-0">¿A qué nos dedicamos?</h2>
          <Row className="d-flex justify-content-evenly">
            {cardsData.map((card)=>{
                return (
                  <Col lg={4} key={card.id}>
                    <CardHome
                        title={card.title}
                        textButton={card.textButton}
                        color={card.color}
                        urlButton={card.urlButton}
                        textBody={card.textBody}
                        accentLetter={card.accentLetter}/>
                  </Col>
               )
              })
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home;
