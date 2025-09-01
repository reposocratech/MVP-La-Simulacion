import { Col, Container, Row } from "react-bootstrap";
import { FormReview } from "../../../components/FormReview/FormReview";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import "./review.css";

const Review = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        //LLamada al back para recoger los datos de la tabla event
        const res = await fetchData(`/events/event/${id}`, "get");
        setEvent(res.data.event);
      } catch(error) {
        console.log(error);        
      }
    };
    getData();
  }, [id]);

  return (
    <section>
      <Container className="text-center">
        <h1 className="mt-5"><span className='span-review accent-text align-middle'>RW </span>{event?.event_title} </h1>
        <h2 className="mt-3">{event?.event_description} </h2>
        <section className="py-5">
          <Row className="justify-content-center">
            <Col lg={7}>
              <FormReview event_id={id} />
            </Col>
          </Row>
        </section>
      </Container>
    </section>
  );
};

export default Review;
