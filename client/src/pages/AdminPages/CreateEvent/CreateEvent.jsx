import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";
import { Sections } from "../../../components/FormsCreateEvent/Sections";

const initialValue = {
  event_title: "",
  event_description: "",
  location: "",
  cover_image: "",
  duration: "",
  start_date: "",
  end_date: "",
  start_hour: "",
  end_hour: "",
  number_of_attendees: "",
  price: "",
  ticket_link: "",
  type_event: "",
  section_public: {key_points: [], section_title: "Público beneficiario"},
  sections: []
}

const CreateEvent = () => {
  const [dataTotal, setDataTotal] = useState(initialValue);
  const [formOk, setFormOk] = useState(false);
  const [coverImg, setCoverImg] = useState();
  const [sectionsImages, setSectionsImages] = useState([]);

  const navigate = useNavigate();

  const handleFile = (e) => {
    setCoverImg(e.target.files[0]);
  }

  const handleSectionFile = (sec_id, files) => {
    setSectionsImages([...sectionsImages, {sec_id, files}]);
  }

  console.log("SECTION IMGS", sectionsImages);

  const cancel = (e) => {
    e.preventDefault();
    setDataTotal(initialValue);
    setCoverImg();
    navigate('/admin/events');
  }

  const terminar = () =>{
      console.log("mando el objeto: ", dataTotal);
      let sections = dataTotal.sections;
      let prueba = [];
      let sectionsFinal = sections.map((elem, i)=>{
          let fotos = sectionsImages.find(e=>e.sec_id === elem.sec_id);
          prueba.push({sec_id: `section${i+1}`, files: fotos.files});
          let ptosFinal = elem.key_points.map((pto, ix)=>{
              return({...pto, pto_id:ix+1 })
          })
          return(
              {...elem, sec_id: i+1, key_points:ptosFinal}
          )
      })
      console.log("PRUEBAAAAAAAAA", prueba)
      let datamandar = {...dataTotal, sections:sectionsFinal}
      console.log(datamandar);
      
      const newFormData = new FormData();
      newFormData.append("dataTotal", datamandar);
      prueba.forEach((elem)=>{
        newFormData.append(elem.sec_id, elem.files);
      })
      newFormData.append("cover_image", coverImg)
      for (const [key, value] of newFormData.entries()) {
        console.log("***********************", key, value);
      }

      //navigate('/')
      //setDataTotal(initialValue);


      //axion
  }

  console.log("DATTAAAA", dataTotal);

  return (
      <section className="section-create-event">
        <Container>
          <Row>
            <Col>
              <article>
                <p>Tipo: {dataTotal.type_event}</p>
                <p>Título: {dataTotal.event_title}</p>
                <p>Descripción: {dataTotal.event_description}</p>
                <p>Localización: {dataTotal.location}</p>
                <p>Imagen: {coverImg?.name}</p>
                <p>Duración Total: {dataTotal.duration}</p>
                <p>Fecha de inicio: {dataTotal.start_date}</p>
                <p>Fecha de fin: {dataTotal.end_date}</p>
                <p>Hora de inicio: {dataTotal.start_hour}</p>
                <p>Hora de fin: {dataTotal.end_hour}</p>
                <p>Número de asistentes: {dataTotal.number_of_attendees}</p>
                <p>Coste Total: {dataTotal.price}</p>
                <p>Enlace ticketera: {dataTotal.ticket_link}</p>
              </article>
            </Col>
            <Col>
              <div>
                {dataTotal.section_public.key_points.length !== 0 &&
                <div>
                  <h2>Sección 1: {dataTotal.section_public.section_title}</h2>
                  {dataTotal.section_public.key_points.map((elem, index)=>{
                    return (
                      <div key={index}>
                      <p>{elem.key_point_title}</p>
                      <p>{elem.key_point_description}</p>
                      </div>
                    )
                  })}
                </div> }
                <Sections dataTotal={dataTotal} setDataTotal={setDataTotal}/>
              </div>
              <Outlet context={{
                dataTotal, 
                setDataTotal,
                formOk,
                setFormOk,
                coverImg,
                cancel, 
                navigate,
                handleFile, 
                terminar,
                handleSectionFile}}/>
            </Col>
          </Row>
        </Container>
      </section>
  )
}

export default CreateEvent;
