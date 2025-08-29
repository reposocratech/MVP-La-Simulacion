import React, { useState } from "react";
import { ModalKeyPoints } from "./ModalKeyPoints";
// import './ptosInteres.css'
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
    <div className="puntos-interes">
      {sec.key_points.map(e=>{
        return(
          <div className="cont-pto-int" key={e.pto_id}>
            <div className="option"><p>{e.key_point_title}</p></div>
            <div className="option"><p>{e.key_point_description}</p></div>
            <div>
              <button onClick={()=>delPunto(e.pto_id, sec.sec_id)}>del</button>
            </div>
          </div>
        )
      })}

        <button onClick={() => setShowForm(true)}>Añadir Punto Interés</button>
  
       <ModalKeyPoints 
            show={showForm} 
            handleClose={handleClose}
            handleChange={handleChange}
            onSubmit={onSubmit}
            keyPoint={keyPoint}/>
    </div>
  );
};














