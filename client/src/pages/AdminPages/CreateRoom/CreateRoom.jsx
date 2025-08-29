import { useState } from "react";
import { FormRoom1 } from "../../../components/FormRoom/FormRoom1";
import { FormRoom2 } from "../../../components/FormRoom/FormRoom2";
import { fetchData } from "../../../helpers/axiosHelper";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { ZodError } from "zod";
import { useNavigate } from "react-router";
import { createRoomSchema2 } from "../../../schemas/createRoomSchema2";
import { createRoomSchema1 } from "../../../schemas/createRoomSchema1";
import { validateForms } from "../../../helpers/validateForms";

const initialValue = {
  room_name: "",
  room_description: "",
  who_can_use_it: "",
  pricing: "",
  usage_policy: "",
  file: ""
}

const CreateRoom = () => {
  const [roomData, setRoomData] = useState(initialValue);
  const [files, setFiles] = useState();
  const [showForm, setShowForm] = useState(1);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [fileError, setFileError] = useState();

  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setRoomData({...roomData, [name]:value})
  }

  const handleFile = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 3) {
      setFileError('Solo puedes subir un máximo de 3 imágenes.');
      e.target.value = null; 
      return; 
    }

    setMsgError(null); 
    setFiles(selectedFiles);
  }

  const next = (e)=>{
    e.preventDefault();

    try {
      // Validamos los datos del primer formulario usando la función validateForms
      const { valid, errors} = validateForms(createRoomSchema1, roomData);
      setValError(errors);

      if(valid){
        setShowForm(2);
        setValError({});
      }
 
    } catch (error) {
      console.log(error);
      setValError({});
      setMsgError('Algo salío mal, inténtelo de nuevo');
    }
  }

  const previous = (e)=>{
    e.preventDefault();
    setShowForm(1);
  }

  const cancel1 = (e)=>{
    e.preventDefault();
    setRoomData(initialValue);
    navigate('/admin/adminPanel');
  }

  const cancel2 = (e)=>{
    e.preventDefault();
    setRoomData(initialValue);
    setShowForm(1);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      //Validamos los datos del segundo formulario usando la función validateForm
      const { valid, errors } = validateForms(createRoomSchema2, roomData);
      setValError(errors);

      if(valid){
        // Creamos un objeto FormData para enviar datos y archivos al backend y agregamos los datos al formulario convirtiendolo a JSON
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(roomData));

        if(files){
          for(const elem of files){
            newFormData.append("file", elem)
          }
        }
        
        let res = await fetchData("/rooms/createRoom", "post", newFormData, token);

        // Usamos el id que extraímos en el dal y que nos llega por el controlador
        let room_id = res.data.room_id;
        navigate(`/oneRoom/${room_id}`);
        setValError({});    
      }
    } catch (error) {
        console.log(error);
        setValError({});
        setMsgError('Algo salío mal, inténtelo de nuevo');
      }
    
  }

  return (
    <>
      {showForm === 1 && <FormRoom1 
          room={roomData}
          handleChange={handleChange}
          next={next}
          cancel={cancel1}
          valError={valError}
        />}
      {showForm === 2 && <FormRoom2 
          room={roomData}
          handleChange={handleChange}
          handleFile={handleFile}
          previous={previous}
          cancel={cancel2}
          onSubmit={onSubmit}
          valError={valError}
          msgError={msgError}
          fileError={fileError}
        />}
          
    </>
  )
}

export default CreateRoom;