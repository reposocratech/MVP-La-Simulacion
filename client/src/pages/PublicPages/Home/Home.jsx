import { Col, Container, Row } from 'react-bootstrap';
import circle from '../../../assets/decorative/circulo-con-flor.svg';
import { CardHome } from '../../../components/Cards/CardHome/CardHome';
import './home.css';

// Creamos este array de objetos para pasar la información personalizable al componente CardHome:
const cardsData = [
  {   
    id: 1, 
    title: "Nuestros servicios",
    textButton: "Más info",
    color: "#F0B9D9", 
    urlButton: "/servicesCoop",
    textBody: 
      <>
        <p>
          Desde la <strong>Cooperativa La Simulación</strong> ofrecemos servicios de roducción, gestión cultural y comunicación a artistas, colectivos y entidades. 
        </p>
        <p>
          Trabajamos también con áreas municipales y administraciones públicas, adaptando cada proyecto a las necesidades del territorio.
        </p>
      </>
    ,
    accentLetter: "S",
   },
  {
    id: 2,
    title: "Eventos y Talleres",
    textButton: "Más info",
    color: "#B4D380", 
    urlButton: "/events",
    textBody: 
    <>
        <p>
          <strong>La Simulación</strong> organiza eventos culturales y talleres que combinan formación, creación y comunidad. 
        </p>
        <p>
          Uno de nuestros principales objetivos con estos eventos y talleres es, además del fomento y desarrollo de la cultura en el tejido social, dar visibilidad al talento local.
        </p>
      </>,
    accentLetter: "E"
  },
  {
    id: 3,
    title: "Set de Grabación",
    textButton: "Más info",
    color: "#D890EA",
    urlButton: "/oneRoom/2",
    textBody: 
    <>
      <p>
        La <strong>Asociación La Simulación</strong> pone a disposición un set de grabación pensado para artistas emergentes que empiezan su trayectoria y no tienen recursos
      </p> 
      <p>
        Su uso está limitado a dos sesiones por artista, con un precio simbólico que garantiza apoyo inicial sin competir con el sector profesional.
      </p>
    </>,
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
                  <span className="fw-bold">La Simulación</span> es un ecosistema cultural nacido en Castelló que impulsa la creatividad local a través de la formación, la producción y la difusión artística. Desde la asociación y la cooperativa trabajamos con una mirada comunitaria para acompañar a artistas, colectivos y proyectos emergentes, generando espacios donde la cultura se entiende como un derecho y como motor de transformación social.
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
          <Row className="column-gap-2 row-gap-4">

            {/* Realizamos un mapeo del array "cardsData",
             donde cada elemento (objeto), va a pintar una "CardHome" y a 
             pasarle sus valores por props de forma dinámica: */}
            {cardsData.map((card)=>{
                return (
                  <Col key={card.id} className="d-flex">
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
