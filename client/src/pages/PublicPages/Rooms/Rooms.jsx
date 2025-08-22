import { Col, Container, Row } from "react-bootstrap";
import './rooms.css';

const Rooms = () => {
  return (
    <section className="section-rooms">
      <Container>
        <h1><span>SG </span>Set de Grabación</h1>
        <Row className="justify-content-center gy-4">
          <Col md={6} lg={4}>
            <div>
              <img src="/images/imagesRooms/img01.jpg" alt="" className="w-100 rounded-4"/>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div>
              <img src="/images/imagesRooms/img02.jpg" alt="" className="w-100 rounded-4"/>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div>
              <img src="/images/imagesRooms/img03.jpg" alt="" className="w-100 rounded-4"/>
            </div>
          </Col>
        </Row>

        <div className="text-center my-4">
          <button>Solicitud de reserva</button>
        </div>

        <Row className="align-items-stretch gy-4">
          <Col lg={6}>
            <article className="p-3 rounded-4 h-100">
              <h2>Características de este espacio</h2>
              <p>
                Es un <strong>espacio creativo</strong> en el corazón de la ciudad, diseñado para músicos, productores y artistas. Ofrecemos un <strong>entorno acústicamente optimizado</strong> con equipos de alta gama, perfectos para la grabación, mezcla y masterización.
              </p>
              <p>
                Nuestro estudio cuenta con una sala de control espaciosa, una cabina de grabación insonorizada y una selección de micrófonos e instrumentos de calidad profesional.  
              </p>
              <p>
                Un lugar ideal para dar vida a tu música, con flexibilidad y todo el soporte que necesitas.
              </p>
            </article>
          </Col>
          <Col lg={6}>
            <article className="p-3 rounded-4">
              <h2>¿Quién puede solicitar su uso?</h2>
              <p>
                Este servicio está destinado a <strong>artistas emergentes</strong>, entendiendo por ello:
              </p>
              <p>
                <strong>Músicos:</strong> con menos de 10.000 reproducciones por canción o 5.000 oyentes mensuales en Spotify/YouTube.
              </p>
              <p>
                <strong>Ilustradores/as y artistas visuales:</strong> en etapa inicial, sin exposiciones individuales de gran alcance o contratos comerciales establecidos.
              </p>
              <p>
                <strong>Modelos y performers:</strong> en proceso de creación de portafolio y sin representación por agencias consolidadas.
              </p>
              <p>
                <strong>Proyectos audiovisuales:</strong> que no cuenten con financiación comercial ni presupuestos elevados de producción.
              </p>
              <p>
                <span>* Cada solicitud será evaluada para garantizar que cumple con el propósito del espacio.</span>
              </p>
            </article>
          </Col>
        </Row>
        <article className="my-4 p-3 rounded-4">
          <h2>Tarifas</h2>
          <p>
            Alquiler del espacio: (Portafondos blanco 3m): <b>25€/hora (15€/hora para socias).</b>
            El alquiler del material adicional (foco grande Godox SL300IIBI + softbox y focos pequeños de colores) tiene un coste de 50€ por jornada (35€ socias).
          </p>
        </article>
        <article className="p-3 rounded-4">
          <h2>Política de uso y condiciones</h2>
          <p>
            El alquiler del espacio es de <b>25€/hora. (15€/hora socias)</b>
          </p>
          <p>
            El alquiler del material adicional (foco grande Godox SL300IIBI + softbox y focos pequeños de colores) tiene un coste de 50€ por jornada (35€ socias).
          </p>
          <p>
            Se requiere <b>puntualidad</b> en los horarios indicados.
          </p>
          <p>
            El pago debe realizarse antes de la sesión.
          </p>
          <p>
            El espacio debe ser <b>entregado limpio</b> y en las mismas condiciones en las que se recibió.
          </p>
          <p>
            Cualquier daño al material o al espacio será responsabilidad del usuario y deberá ser asumido económicamente.
          </p>
          <p>
            Desde la asociación La Simulación, queremos facilitar el acceso a herramientas profesionales para artistas emergentes de Castelló. Por eso, ofrecemos nuestro espacio y material a un coste reducido.
            Los ingresos generados se destinan a dos fines, en primer lugar como donativo a la asociación, contribuyendo al desarrollo de nuestros proyectos y objetivos en apoyo a la comunidad artística de la ciudad. En segundo lugar como aportación para cubrir gastos de mantenimiento, como el consumo eléctrico del espacio.
          </p>
          <p>
            <b>Normas básicas de uso:</b>
          </p>
          <p>
            -Puntualidad en los horarios indicados.
          </p>
          <p>
            -El pago debe realizarse antes de la sesión.
          </p>
          <p>
            -El espacio debe entregarse limpio y en las mismas condiciones en las que se recibió.
          </p>
          <p>
            -Los usuarios son responsables de cualquier daño al material o al espacio, debiendo asumir los costes de reparación o reemplazo...
          </p>
        </article>
        <div className="text-center mt-4">
          <button>Solicitud de reserva</button>
        </div>
      </Container>
    </section>
  )
}

export default Rooms;
