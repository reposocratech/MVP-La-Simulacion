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

  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setRoomData({...roomData, [name]:value})
  }

  const handleFile = (e) => {
    setFiles(e.target.files);
  }

  const next = (e)=>{
    e.preventDefault();

    try {
      createRoomSchema1.parse(roomData);
      setShowForm(2);
      setValError({});
    } catch (error) {
            if (error instanceof ZodError){
        let objectTemp = {}
        error.issues.forEach((er)=>{
        objectTemp[er.path[0]]=er.message
        })
        setValError(objectTemp)
        setMsgError(null);
      }else{
        setValError({});
        setMsgError('Algo salío mal, inténtelo de nuevo');
      }
    }
    
  }

  const previous = (e)=>{
    e.preventDefault();
    setShowForm(1);
  }

  const cancel = ()=>{
    setRoomData(initialValue);
    setShowForm(1);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      createRoomSchema2.parse(roomData);

      const newFormData = new FormData();
      newFormData.append("data", JSON.stringify(roomData));

      if(files){
        for(const elem of files){
          newFormData.append("file", elem)
        }
      }
      
      let res = await fetchData("/rooms/createRoom", "post", newFormData, token);

      setValError({});
      //navigate(`/rooms/room${id}`)
    } catch (error) {
      
      if (error instanceof ZodError){
        let objectTemp = {}
        error.issues.forEach((er)=>{
        objectTemp[er.path[0]]=er.message
        })
        setValError(objectTemp)
        setMsgError(null);
      }else{
        setValError({});
        setMsgError('Algo salío mal, inténtelo de nuevo');
      }
    }
  }

  return (
    <>
      {showForm === 1 && <FormRoom1 
          room={roomData}
          handleChange={handleChange}
          next={next}
          cancel={cancel}
          valError={valError}
          msgError={msgError}
        />}
      {showForm === 2 && <FormRoom2 
          room={roomData}
          handleChange={handleChange}
          handleFile={handleFile}
          previous={previous}
          cancel={cancel}
          onSubmit={onSubmit}
          valError={valError}
          msgError={msgError}
        />}
          
    </>
  )
}

export default CreateRoom;