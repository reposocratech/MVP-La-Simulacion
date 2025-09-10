import { Col, Container, Row } from "react-bootstrap";
import { FormReview } from "../../../components/FormReview/FormReview";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import "./review.css";

const Review = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        //LLamada al back para recoger los datos de la tabla event
        const res = await fetchData(`/events/event/${id}`, "get");
        setEvent(res.data);
        console.log(res);
        
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
        <button className="submit-button mt-5" onClick={()=>navigate(`/event/${id}`)}>
          Volver a evento
        </button>
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
