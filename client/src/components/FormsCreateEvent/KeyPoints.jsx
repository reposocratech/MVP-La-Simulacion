import React, { useState } from "react";
import { ModalKeyPoints } from "./ModalKeyPoints";

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
    <div className="bg-primary p-3">
      <button 
        className="lavender-button"
        onClick={() => setShowForm(true)}
      >Añadir punto clave</button>
      {sec.key_points.map(e=>{
        return(
          <div className="bg-info p-2" key={e.pto_id}>
            <p className="mb-0 fw-bold p-list">{e.key_point_title}</p>
            <p className="mb-0">{e.key_point_description}</p>
            <div className="text-end">
              <button onClick={()=>delPunto(e.pto_id, sec.sec_id)}>del</button>
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














