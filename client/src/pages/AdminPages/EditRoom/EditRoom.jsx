import { useContext, useEffect, useState } from "react";
import { FormEditRoom1 } from "../../../components/FormEditRoom/FormEditRoom1";
import { FormEditRoom2 } from "../../../components/FormEditRoom/FormEditRoom2";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";

const initialValue = {
  room_name: "",
  room_description: "",
  who_can_use_it: "",
  pricing: "",
  usage_policy: "",
  file: ""
}
const EditRoom = () => {
  const [roomData, setRoomData] = useState(initialValue);
  const [showForm, setShowForm] = useState(1);
  const [files, setFiles] = useState();
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchRoom = async() => {
      try {
        const res = await fetchData(`/rooms/room/${id}`, "get");
        setRoomData(res.data.room[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoom();
  }, [id, token]);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setRoomData({...roomData, [name]:value})
  }

  const handleFile = (e) => {
    setFiles(e.target.files);
  }

  const next = (e)=>{
    e.preventDefault();
    setShowForm(2);
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
  
  const onSubmit = async(e)=>{
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(roomData));

    if(files){
      for(const elem of files){
        newFormData.append("file", elem)
      }


    }

    await fetchData(`/rooms/editRoom/${id}`, 'put', newFormData, token);
  }

  return (
    <>
      {showForm === 1 && <FormEditRoom1
        room={roomData}
        handleChange={handleChange}
        cancel={cancel1}
        next={next}
        valError={valError}
        msgError={msgError} 
      />}
      {showForm === 2 && <FormEditRoom2
        room={roomData}
        handleChange={handleChange}
        handleFile={handleFile}
        cancel={cancel2}
        previous={previous}
        onSubmit={onSubmit}
        valError={valError}
        msgError={msgError} 
      />}
    </>

  )
}

export default EditRoom;
