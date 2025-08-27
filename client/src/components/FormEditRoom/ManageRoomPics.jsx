import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../helpers/axiosHelper";
import { AuthContext } from "../../context/AuthContextProvider";
import { FaTrash } from "react-icons/fa";
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
  },[]);

  const deleteImg = async(room_image_id, file)=>{
    const data = {id ,room_image_id, file}
   
    try {
      const res = await fetchData('/rooms/deleteImg', "delete", data, token);
      
      setImages(images.filter(e=>e.room_image_id !== room_image_id))
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <section>
      {images.map((img)=>{
        return (
          <div className="list-img" key={id}>
            <div className="room-img">
              <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${img.file}`} alt="" />
               <FaTrash className="fatrash" onClick={()=>deleteImg(img.room_image_id, img.file)}/>
            </div>
            <div>
             
            </div>
          </div>
        )
      })}
    </section>
  )
}
