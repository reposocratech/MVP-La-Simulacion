import { HiTrash } from "react-icons/hi";
import { fetchData } from "../../helpers/axiosHelper";
import { EditModalKeyPoints } from "./EditModalKeyPoints";
import { useContext, useState } from "react";
import { useParams } from 'react-router';
import { AuthContext } from "../../context/AuthContextProvider";
const initialValue = {
 key_point_title:"",
 key_point_description:""
}

export const SectionList = ({sections, setCurrentForm, setSelectedSectionId ,setRefresh , refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [keyPoint, setKeyPoint] = useState(initialValue);
  const [takeSeccId, setTakeSeccId] = useState()
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();


 const {id} = useParams()
 const {token} = useContext(AuthContext)
  const handleChange = (e) =>{ 
    const {name, value} = e.target;
    setKeyPoint({...keyPoint, [name]: value});
  } 

  const handleClose = () => {
    setShowForm(false);
    setKeyPoint(initialValue);
  }
  
  const openEdit = (id) => {
    setSelectedSectionId(id);
    setCurrentForm(3);
  }
  const keypointsDelete = async (sections) => {
   
    try {
      const res = await fetchData("/events/delkeypoint", "put", {key_point_id: sections.section_key_point_id}, token);
      console.log(res);
      setRefresh(!refresh); 
    } catch (error) {
      console.error("Error al borrar ", error);
    }
  };
   const keypointsAdd = async () => {
   
    try {
      const res = await fetchData(`/events/addkeypoint/${id}`, "put", {section_id: takeSeccId.section_id,keyPoint} , token);
      console.log(res);      
      setShowForm(false);
      setRefresh(!refresh);       
      setKeyPoint(initialValue);
      setCurrentForm(1)
          
    } catch (error) {
      console.error("Error :", error);
    }
  };
 
  
  return (
    <div>
      {
        sections.map(elem => (
          <div className="section-sections mb-3" key={elem.section_id}>
            <h3>{elem.section_title}</h3>
            <p>{elem.section_subtitle}</p>
            <p>{elem.section_description}</p>
            <p>{elem.section_duration}</p>
            <div className="d-flex gap-3">
              <button
                className="btn-table"
                onClick={() =>{setTakeSeccId(elem) , openEdit(elem.section_id)}}
                disabled={elem.section_id === 1}
              >Editar sección</button>
              <button
                 onClick={() => {setTakeSeccId(elem); setShowForm(true) }}
                className="btn-table"
              >Añadir punto clave</button>
            </div>
            <div className="mt-3">
              {elem.keyPoints.map(key => (
                <div className="rounded-4 p-2 mb-2 bg-light" key={key.section_key_point_id}>
                  <div className="d-flex justify-content-between gap-3">
                    <div>
                      <p className="mb-0 fw-bold p-list">{key.key_point_title}</p>
                      <p className="mb-0">{key.key_point_description}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => keypointsDelete(key)}
                        className="delete-button-icon"
                      ><HiTrash size={20} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      }
             <EditModalKeyPoints
              show={showForm} 
              handleClose={handleClose}
              handleChange={handleChange}
              onSubmit={keypointsAdd}
              keyPoint={keyPoint}
              valError={valError}
              msgError={msgError}
            />
      </div>
  )
}






