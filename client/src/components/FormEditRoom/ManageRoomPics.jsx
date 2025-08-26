import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../helpers/axiosHelper";
import { AuthContext } from "../../context/AuthContextProvider";
import './formEditRoom.css'


export const ManageRoomPics = ({room, files, id}) => {
  const [images, setImages] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(()=>{
    // Llamada para pedir todas las imágenes de una sala en concreto
    const fetchPic = async()=>{
      const res = await fetchData(`/rooms/imagesByRoomId/${id}`, "get", null, token);
      setImages(res.data);
    }
    fetchPic();
  },[])

  return (
    <section>
      {images.map((img)=>{
        return (
          <div className="list-img">
            <div className="room-img">
              <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${img.file}`} alt="" />
            </div>
          </div>
        )
      })}
    </section>
  )
}
