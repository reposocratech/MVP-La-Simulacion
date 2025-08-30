import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
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

    if (data.key_point_title || data.key_point_description) {
      let keyPoints = [...dataTotal.section_public.key_points];
      keyPoints.push(data);
      let section = {
        ...dataTotal.section_public, 
        key_points: keyPoints
      }
      setDataTotal({...dataTotal, section_public: section});
    }
    navigate('step2');
  }

  return (
    <div>
      <div className='mb-5 d-flex flex-column flex-md-row gap-2'>
        <button 
          className='submit-button' 
          onClick={prevForm}
        >Anterior</button>
        <button 
          className='submit-button' 
          disabled={dataTotal.section_public.key_points.length === 0}
          onClick={()=>navigate('newSection')}
        >Siguiente</button>
        <button 
          className='cancel-button' 
          onClick={cancel}
        >Cancelar</button>
        <button 
          className='submit-button' 
          disabled={dataTotal.section_public.key_points.length === 0}
        >Terminar</button>
      </div>

      <div className="p-3 bg-color-secondary-light-pink rounded-4">
        <h2 className="fs-3 mb-3">{dataTotal.section_public.section_title}</h2>
        <Row className="justify-content-between">
          <Col lg={5}>
            {showForm ?
              <form>
                <Form.Group className="mb-3" controlId="formBasicKeyTitle">
                  <Form.Control
                    type="text"
                    placeholder="Nombre del público"
                    onChange={handleChange}
                    value={data.key_point_title}
                    name="key_point_title"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicKeyDesc">
                  <Form.Control
                    type="text"
                    placeholder="Descripción del público"
                    onChange={handleChange}
                    value={data.key_point_description}
                    name="key_point_description"
                  />
                  {/* {valError.duration && <Form.Text className="text-danger fw-bold">{valError.duration}</Form.Text>} */}
                </Form.Group>
                <button
                  className="btn-table me-3"
                  type="button"
                  onClick={addKeyPoint}
                >Aceptar</button>
                <button
                  className="btn-table block"
                  type="button"
                  onClick={cancelKeyPoint}
                >Cancelar</button>
              </form>
              :
              <div>
                <button
                  className="lavender-button"
                  onClick={()=>setShowForm(true)}
                >Añadir público</button>
              </div>
            }
          </Col>
          <Col lg={7}>
            {dataTotal.section_public.key_points.map((elem, index) => (
              <article key={index}>
                <p className="mb-0 fw-bold p-list">{elem.key_point_title}</p>
                <p className="mb-0">{elem.key_point_description}</p>
              </article>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Step3;
