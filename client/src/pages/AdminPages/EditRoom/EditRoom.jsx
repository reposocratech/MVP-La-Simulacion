import { useContext, useEffect, useState } from "react";
import { FormEditRoom1 } from "../../../components/FormEditRoom/FormEditRoom1";
import { FormEditRoom2 } from "../../../components/FormEditRoom/FormEditRoom2";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import { ManageRoomPics } from "../../../components/FormEditRoom/ManageRoomPics";
import { validateForms } from "../../../helpers/validateForms";
import { createRoomSchema1 } from "../../../schemas/createRoomSchema1";
import { createRoomSchema2 } from "../../../schemas/createRoomSchema2";

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
    
    try {
      const {valid, errors} = validateForms(createRoomSchema1, roomData);
      setValError(errors);

      if(valid){
        setShowForm(2);
        setValError({});
      }

    } catch (error) {
      console.log(error);
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
  
  const onSubmit = async(e)=>{
    e.preventDefault();

    try {
      const { valid, errors } = validateForms(createRoomSchema2, roomData);
      setValError(errors);

      if(valid){
        await fetchData(`/rooms/editRoom/${id}`, 'put', roomData, token);
        setShowForm(3);
        setValError({});    
      }
      
    } catch (error) {
      console.log(error);
      setMsgError('Algo salío mal, inténtelo de nuevo');
    }
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
      {showForm === 3 && <ManageRoomPics
        id={id}
        msgError={msgError}
        setMsgError={setMsgError}
       />}
    </>

  )
}

export default EditRoom;
