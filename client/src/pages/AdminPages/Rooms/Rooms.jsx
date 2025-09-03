import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import './rooms.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetchData("/rooms/rooms", "get");
        console.log(res.data);
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <section className="section-allRooms">
      <Container>
        <h1 className="text-center mb-4">
          <span>S</span>
          Todas las salas
        </h1>
        {rooms?.map(room => (
          <article
            key={room.room_id}
            className='card-rooms mx-auto rounded-4 overflow-hidden mb-5'
          >
              <div className="row ">
                <div className="col">
                  <div className="p-3 pt-2 d-flex flex-column justify-content-between h-100">
                    <h4 className='mb-3'>{room.room_name}</h4>
                    <p className="fw-bold mb-0">Descripción:</p>
                    <p>
                      {room.room_description}
                    </p>
                    <div>
                      <button onClick={() => navigate(`/oneRoom/${room.room_id}`)} className='info-button'>Mas información</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <img 
                    src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${room.first_image}`}  
                    alt="" 
                    className='w-100 h-100 object-fit-cover'
                  />
                </div>
              </div>
          </article>
        ))}
      </Container>
    </section>
  )
}

export default Rooms;