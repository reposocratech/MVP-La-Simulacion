import { useState } from "react";
import { FormRoom1 } from "../../../components/FormRoom/FormRoom1";
import { FormRoom2 } from "../../../components/FormRoom/FormRoom2";
import { fetchData } from "../../../helpers/axiosHelper";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";

const initialValue = {
  room_name: "",
  room_description: "",
  who_can_use_it: "",
  pricing: "",
  usage_policy: "",
  file: ""
}

const CreateRoom1 = () => {
  const [room, setRoom] = useState(initialValue);
  const [files, setFiles] = useState();
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);

  const {token} = useContext(AuthContext);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setRoom({...room, [name]:value})
  }

  const handleFile = (e) => {
    setFiles(e.target.files);
  }

  const next = (e)=>{
    e.preventDefault();
    setForm1(false);
    setForm2(true);
  }

  const previous = (e)=>{
    e.preventDefault();
    setForm1(true);
    setForm2(false);
  }

  const cancel = ()=>{
    setRoom(initialValue);
    setForm1(true);
    setForm2(false);
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      const newFormData = new FormData();
      newFormData.append("data", JSON.stringify(room));

      if(files){
        for(const elem of files){
          newFormData.append("file", elem)
        }
      }
      
      let res = await fetchData("/rooms/createRoom", "post", newFormData, token);
      console.log(res); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {form1 && <FormRoom1 
          room={room} 
          setRoom={setRoom}
          handleChange={handleChange}
          next={next}
          cancel={cancel}
        />}
      {form2 && <FormRoom2 
          room={room} 
          setRoom={setRoom}
          handleChange={handleChange}
          handleFile={handleFile}
          previous={previous}
          cancel={cancel}
          onSubmit={onSubmit}
        />}
          
    </>
  )
}

export default CreateRoom1;