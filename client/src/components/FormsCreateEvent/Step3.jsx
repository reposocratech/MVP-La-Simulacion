import { useState } from "react";
import { Form } from "react-bootstrap";
import { useOutletContext } from "react-router";

const initialValue = {
  key_point_title: "",
  key_point_description: ""
}

const Step3 = () => {

  const {cancel, navigate, dataTotal, setDataTotal} = useOutletContext();

  const [data, setData] = useState(initialValue);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }


  const addKeyPoint = () =>{
    let keyPoints = [...dataTotal.section_public.key_points];
    keyPoints.push(data);
    let section = {
      ...dataTotal.section_public, 
      key_points: keyPoints
    }
    setDataTotal({...dataTotal, section_public: section});
    setShowForm(false);
    setData(initialValue);
  }

  const cancelKeyPoint = () => {
    setData(initialValue);
    setShowForm(false);
  }

  const prevForm = (e) => {
    e.preventDefault();
    let keyPoints = [...dataTotal.section_public.key_points];
    keyPoints.push(data);
    let section = {
      ...dataTotal.section_public, 
      key_points: keyPoints
    }
    setDataTotal({...dataTotal, section_public: section});
    navigate('step2');
  }



  return (
    <>
      <div>
        {/* creo que este div sobra porque es repetitivo con lo que hay en el createEvent */}
      <h3>Lista puntos de interés:</h3>
      {dataTotal.section_public.key_points.map(elem=>{
        return (
          <div>
            <p>{elem.key_point_title}</p>
            <p>{elem.key_point_description}</p>
          </div>
        )
      })}
          
          {showForm ?
          <form action="">
            <input type="text" placeholder="Nombre del público" name="key_point_title" onChange={handleChange} value={data.key_point_title}/>
            <input type="text" placeholder="Descripción del público" name="key_point_description" onChange={handleChange} value={data.key_point_description}/>
            <button type="button" onClick={addKeyPoint}>Aceptar</button>
            <button type="button" onClick={cancelKeyPoint}>Cancelar</button>
          </form>
          : 
          <button onClick={()=>setShowForm(true)}>Añadir punto de interés</button>
          } 
          <div className='d-flex flex-column flex-md-row gap-2'>
            <button className='submit-button' onClick={prevForm} >Anterior</button>
            
            <button className='submit-button' disabled={dataTotal.section_public.key_points.length === 0}
            onClick={()=>navigate('newSection')}>Siguiente</button>
            <button className='cancel-button' onClick={cancel}>Cancelar</button>
            <button className='submit-button' disabled={dataTotal.section_public.key_points.length === 0}>Terminar</button>
          </div>
    
      </div>
    </>
   
  )
}

export default Step3;
