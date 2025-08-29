import { Col, Container, Row } from "react-bootstrap";
import { FormReview } from "../../../components/FormReview/FormReview";


const Prueba = () => {
  return (
    <div>
      <Container>
        <section>
          <h3>Seccion 1</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, rerum quos nulla ipsa ad odio quae quas repellendus minima deserunt, veniam, consequatur porro voluptates explicabo magni odit sunt maiores vitae iusto omnis ab maxime quisquam dolorum ducimus! Molestiae dolorum quae corporis vel velit libero nostrum sequi, odit harum accusantium tenetur.
          </p>
        </section>
        <section>
          <h3>Seccion 2</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus voluptatum quia quaerat temporibus enim totam animi, labore eos suscipit tempora adipisci commodi ipsum assumenda dolorem? A perspiciatis neque temporibus totam necessitatibus laborum itaque? Facere doloremque fugiat laboriosam odio ex quo esse maxime, eos ad quibusdam sit sunt! Excepturi dolor tempora sunt blanditiis quae nesciunt? Fugit magnam natus voluptate quam harum molestiae temporibus consectetur repudiandae voluptas mollitia commodi, modi quo accusamus!
          </p>
        </section>
        <section>
          <h3>Seccion 3</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, rerum quos nulla ipsa ad odio quae quas repellendus minima deserunt, veniam, consequatur porro voluptates explicabo magni odit sunt maiores vitae iusto omnis ab maxime quisquam dolorum ducimus! Molestiae dolorum quae corporis vel velit libero nostrum sequi, odit harum accusantium tenetur.
          </p>
        </section>
        <section>
          <h3>Seccion 4</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat illo eligendi amet fugit placeat quod ex autem quibusdam nisi cum fuga iusto, illum reiciendis, fugiat iste nam veritatis tempora dicta! Praesentium minus iusto culpa temporibus in illum, distinctio et? Perferendis quibusdam veniam minus incidunt. Voluptatum repellendus ratione iure eius mollitia, sunt earum est, corporis hic dicta, perspiciatis ipsam qui reiciendis. Dolor expedita velit corrupti veniam, pariatur officiis, inventore, veritatis saepe reiciendis suscipit labore accusantium deserunt provident quis quod et. Blanditiis.
          </p>
        </section>
        <section className="py-5">
          <Row className="justify-content-center">
            <Col lg={7}>
              <FormReview event_id={2}/>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  )
}

export default Prueba;
