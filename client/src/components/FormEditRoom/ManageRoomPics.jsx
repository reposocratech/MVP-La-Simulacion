import { useContext, useEffect, useState } from "react";
import { Col, Container, Form, Row } from 'react-bootstrap';
import { fetchData } from "../../helpers/axiosHelper";
import { AuthContext } from "../../context/AuthContextProvider";
import { FaTrash } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import './formEditRoom.css'


export const ManageRoomPics = ({room, id}) => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(()=>{
    // Llamada para pedir todas las imágenes de una sala en concreto
    const fetchPic = async()=>{
      const res = await fetchData(`/rooms/imagesByRoomId/${id}`, "get", null, token);
      setImages(res.data);
      
    }
    fetchPic();
  },[]);

  const handleFile = (e) => {
    // Convertimos FileList a un array real con spread
    const files = [...e.target.files];  

    // Número total de imágenes: las que ya hay + las nuevas
    const total = images.length + files.length;

    if (total > 3) {
      alert("Solo puedes tener un máximo de 3 imágenes en la sala.");

      // Calculamos cuántas imágenes nuevas se pueden aceptar
      const allowed = 3 - images.length;

      // Nos quedamos solo con las permitidas
      setSelectedFiles(files.slice(0, allowed));
    } else {
      // Si no pasa el límite, aceptamos todas las seleccionadas
      setSelectedFiles(files);
    }
  };

  const onSubmit = async(e)=>{
    e.preventDefault();
    const newFormData = new FormData();

    newFormData.append('room_id', JSON.stringify({id}));
    if(selectedFiles.length){
      for(const elem of selectedFiles){
        newFormData.append("file", elem);
      }
    }

    try {
      let res = await fetchData('/rooms/addImages', "post", newFormData, token);
    } catch (error) {
      console.log(error);
    }

  }

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
    <section className='section-createRoom'>
      <Container>
        <Row className="d-flex flex-column">
          <h1 className='h1-createRoom  text-center p-2 my-5'><span className='span-createRoom accent-text align-middle'>ES</span>Editar sala (Paso 3):</h1>
          <div className="custom-border p-4">
            <Col >
            <p className="fw-bold text-center">Borrar imágenes</p>
              <div className="d-flex justify-content-center p-5 gap-2">
                {images.map((img) => {
                  return (
                    <div className="list-img" key={img.room_image_id}>
                      <div className="room-img">
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/rooms/${img.file}`}
                          alt=""
                        />
                        <FaTrash
                          className="fatrash"
                          onClick={() => deleteImg(img.room_image_id, img.file)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Col>
            <Col className="d-flex justify-content-center">
            <Form>
                  <Form.Group className="mb-3 text-center" controlId="formBasicFile">
                    <Form.Label>Subir imágenes a la sala <RiUpload2Fill className='ms-2 align-text-top'/></Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFile}
                        multiple
                        name="file"
                        hidden
                      />
                    </Form.Group>
                  <div className='d-flex flex-column flex-md-row gap-2'>
                    <button className='cancel-button w-auto'>Cancelar</button>
                    <button className='submit-button w-auto' onClick={onSubmit}>Guardar y finalizar</button>
                  </div>
                </Form>
            </Col>
          </div>
        </Row>
      </Container>
    </section>
  )
}
