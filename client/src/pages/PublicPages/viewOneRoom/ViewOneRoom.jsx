import { Col, Container, Row } from 'react-bootstrap';

export const ViewOneRoom = () => {
  return (
    <>
      <section className="section-one-room-1">
        <Container>
          <h1><span className="accent-text">SG</span>Set de Grabación</h1>
          <Row>
            <Col>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-one-room-2">
        <Container>
          <Row>
            <Col>
              <article>
                <h2>Características de este espacio:</h2>
                <p>Texto</p>
              </article>
            </Col>
            <Col>
              <article>
                <h2>¿Quién puede solicitar su uso?</h2>
                <p>Texto</p>
              </article>
            </Col>
            <Col>
              <article>
                <h2>Tarifas:</h2>
                <p>Texto</p>
              </article>
            </Col>
            <Col>
              <article>
                <h2>Política de uso y condiciones:</h2>
                <p>Texto</p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
