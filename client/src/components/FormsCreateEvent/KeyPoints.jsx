import { useState } from "react";
import { ModalKeyPoints } from "./ModalKeyPoints";
import { HiTrash } from "react-icons/hi";

const initialValue = {
  pto_int_name:"",
  pto_int_desc:""
}

export const KeyPoints = ({sec, addPoInt, delPunto}) => {
  const [showForm, setShowForm] = useState(false);
  const [keyPoint, setKeyPoint] = useState(initialValue);

  const handleChange = (e) =>{ 
    const {name, value} = e.target;
    setKeyPoint({...keyPoint, [name]: value})
  } 

  const onSubmit = () =>{
    const pto_id = Date.now();
    const ptoToSave = {...keyPoint , pto_id};
    const ptosFinal = [...sec.key_points, ptoToSave];
    addPoInt(ptosFinal, sec.sec_id);
    setKeyPoint(initialValue)
    setShowForm(false);
  }

  const handleClose = () => {
    setShowForm(false);
    setKeyPoint(initialValue);
  }
  
  return (
    <div>
      <div className=" mb-3">
        <button
          className="lavender-button"
          onClick={() => setShowForm(true)}
        >Añadir punto clave</button>
      </div>
      {sec.key_points.map(e=>{
        return(
          <div className="rounded-4 p-2 mb-2 bg-light" key={e.pto_id}>
            <div className="d-flex justify-content-between gap-3">
              <div>
                <p className="mb-0 fw-bold p-list">{e.key_point_title}</p>
                <p className="mb-0">{e.key_point_description}</p>
              </div>
              <div>
                <button
                  className="delete-button-icon"
                  onClick={()=>delPunto(e.pto_id, sec.sec_id)}
                ><HiTrash size={20} /></button>
              </div>
            </div>
          </div>
        )
      })}
  
      <ModalKeyPoints 
        show={showForm} 
        handleClose={handleClose}
        handleChange={handleChange}
        onSubmit={onSubmit}
        keyPoint={keyPoint}
      />
    </div>
  );
};














