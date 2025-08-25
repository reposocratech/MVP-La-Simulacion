import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchData } from "../../../helpers/axiosHelper";
import flowerCircle from '../../../assets/decorative/circulo-con-flor.svg';
import pinkShine from '../../../assets/decorative/brillo-rosa.png';
import greenFlower from '../../../assets/decorative/trebol-verde.svg';
import './oneRoom.css';

const OneRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <section className="section-room ">
      <Container>
        <h1>
          <span>{room?.room_name.split(" ").map(word => word[0]).join("")}</span>
          {room?.room_name}
        </h1>
        <div className="d-flex justify-content-end">
          <img src={pinkShine} alt="" />
          <img src={greenFlower} alt="" />
        </div>
        <Row className="justify-content-center align-items-stretch gy-4">
          {imgRoom?.map((img, index) => {
            return(
              <Col 
                key={img.room_image_id} 
                md={index === 0 ? 12 : 6} 
                lg={index === 2 ? 2 : 5}
              >
                <div className="h-100 position-relative">
                  <img 
                    src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${img.file}`} 
                    alt="" 
                    className="img-room"
                  />
                  {index === 0 && (
                    <div className="img-deco">
                      <img src={flowerCircle} alt="" />
                    </div>
                  )}
                </div>
              </Col>
            )
          })}
        </Row>


        <section className="section-room-info">
          <div className="text-center my-5">
            <button 
              className="btn-violet"
              onClick={() => navigate('/user/roomReservation')}
            >Solicitud de reserva</button>
          </div>
          <article >
            <h2>Características de este espacio</h2>
            <p>
              {room?.room_description}
            </p>
          </article>
          <article>
            <h2>¿Quién puede solicitar su uso?</h2>
            <p>
              {room?.who_can_use_it}
            </p>
          </article>
          <article>
            <h2>Tarifas</h2>
            <p>
              {room?.pricing}
            </p>
          </article>
          <article>
            <h2>Política de uso y condiciones</h2>
            <p>
              {room?.usage_policy}
            </p>
          </article>
          <div className="text-center mt-5">
            <button 
              className="btn-violet"
              onClick={() => navigate('/user/roomReservation')}
            >Solicitud de reserva</button>
          </div>
        </section>
      </Container>
    </section>
  )
}

export default OneRoom;
