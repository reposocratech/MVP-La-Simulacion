import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import './oneRoom.css';
import { useParams } from "react-router";
import { fetchData } from "../../../helpers/axiosHelper";

const OneRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState();
  const [imgRoom, setImgRoom] = useState([]);

  useEffect(() => {
    const fetchRoom = async() => {
      try {
        const res = await fetchData(`/rooms/room/${id}`, "get");
        setRoom(res.data.room[0]);
        setImgRoom(res.data.images);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoom();
  }, [id]);
  console.log(room);
  console.log(imgRoom);

  return (
    <section className="section-room">
      <Container>
        <h1>
          <span>{room?.room_name.split(" ").map(word => word[0]).join("")}</span>
          {room?.room_name}
        </h1>
        <Row className="justify-content-center gy-4">
          {imgRoom?.map((img) => {
            return(
              <Col key={img.room_image_id} md={6} lg={4}>
                <div>
                  <img 
                    src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${img.file}`} 
                    alt="" 
                    className="w-100 rounded-4"
                  />
                </div>
              </Col>
            )
          })}
        </Row>

        <div className="text-center my-4">
          <button>Solicitud de reserva</button>
        </div>

        <Row className="align-items-stretch gy-4">
          <Col lg={6}>
            <article className="p-3 rounded-4 h-100">
              <h2>Características de este espacio</h2>
              <p>
                {room?.room_description}
              </p>
            </article>
          </Col>
          <Col lg={6}>
            <article className="p-3 rounded-4 h-100">
              <h2>¿Quién puede solicitar su uso?</h2>
              <p>
                {room?.who_can_use_it}
              </p>
            </article>
          </Col>
        </Row>
        <article className="my-4 p-3 rounded-4">
          <h2>Tarifas</h2>
          <p>
            {room?.pricing}
          </p>
        </article>
        <article className="p-3 rounded-4">
          <h2>Política de uso y condiciones</h2>
          <p>
            {room?.usage_policy}
          </p>
        </article>
        <div className="text-center mt-4">
          <button>Solicitud de reserva</button>
        </div>
      </Container>
    </section>
  )
}

export default OneRoom;
