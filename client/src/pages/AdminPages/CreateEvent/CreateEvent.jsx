import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Sections } from "../../../components/FormsCreateEvent/Sections";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import './createEvent.css';

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

  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  const showSectionPublic = location.pathname.endsWith("/step3") || location.pathname.endsWith("/newSection");
  const showSectionsComponent = location.pathname.endsWith("/newSection");

  const handleFile = (e) => {
    setCoverImg(e.target.files[0]);
  }

  const handleSectionFile = (sec_id, files) => {
    setSectionsImages([...sectionsImages, {sec_id, files}]);
  }

  //console.log("SECTION IMGS", sectionsImages);

  const cancel = (e) => {
    e.preventDefault();
    setDataTotal(initialValue);
    setCoverImg();
    navigate('/admin/events');
  }

  const terminar = async() =>{

    try {
      //console.log("mando el objeto: ", dataTotal);
      let sections = dataTotal.sections;
      let prueba = [];
      let sectionsFinal = sections.map((elem, i)=>{
          let fotos = sectionsImages.find(e=>e.sec_id === elem.sec_id);
          prueba.push({sec_id: `section${i+1}`, files: fotos.files}); // quizá este id se puede quitar?
          let ptosFinal = elem.key_points.map((pto, ix)=>{
              return({...pto, pto_id:ix+1 })
          })
          return(
              {...elem, sec_id: i+1, key_points:ptosFinal}
          )
      })
      
      let sendData = {...dataTotal, sections:sectionsFinal}
      
      const newFormData = new FormData();
      newFormData.append("dataTotal", JSON.stringify(sendData));
      prueba.forEach((elem)=>{
        console.log("ELEM", elem)
        
        if (elem.files !== undefined){
          let prueba2 = Array.from(elem.files);
          prueba2.forEach((e)=>{
            newFormData.append(elem.sec_id, e);
          })
        }
      })
      newFormData.append("cover_image", coverImg);

      let res = await fetchData("/events/CreateEvent", "post", newFormData, token);
      console.log("RESSS TERMINAR", res);

      //navigate('/')
      //setDataTotal(initialValue);
      
    } catch (error) {
      console.log(error);
    }
  }

  //console.log("DATTAAAA", dataTotal);

  return (
      <section className="section-create-event">
        <h1><span>ET</span>Crear un evento/ taller</h1>
        <Container>
          <Row className="justify-content-between">
            <Col lg={4}>
              <article className="p-3 border border-1 rounded-4">
                <p><span>Tipo:</span> {Number(dataTotal.type_event) === 1 ? "Evento" : "Taller"}</p>
                <p><span>Título:</span> {dataTotal.event_title}</p>
                <p><span>Descripción:</span> {dataTotal.event_description}</p>
                <p><span>Localización:</span> {dataTotal.location}</p>
                <p><span>Imagen:</span> {coverImg?.name}</p>
                <p><span>Duración Total:</span> {dataTotal.duration}</p>
                <p><span>Fecha de inicio:</span> {dataTotal.start_date}</p>
                <p><span>Fecha de fin:</span> {dataTotal.end_date}</p>
                <p><span>Hora de inicio:</span> {dataTotal.start_hour}</p>
                <p><span>Hora de fin:</span> {dataTotal.end_hour}</p>
                <p><span>Número de asistentes:</span> {dataTotal.number_of_attendees}</p>
                <p><span>Coste Total:</span> {dataTotal.price}</p>
                <p><span>Enlace ticketera:</span> {dataTotal.ticket_link}</p>
              </article>
            </Col>
            <Col lg={7}>
              <div>
                {/* SOLO SE RENDERIZA SI ESTAS EN EL STEP3 Y EN NEWSECTION, NO SIEMPRE EN TODOS LOS PASOS */}
                {showSectionPublic &&
                <>
                  <div>
                    <h2>Sección 1: {dataTotal.section_public.section_title}</h2>
                    {dataTotal.section_public.key_points.map((elem, index) => (
                      <div key={index}>
                        <p>{elem.key_point_title}</p>
                        <p>{elem.key_point_description}</p>
                      </div>
                    ))}
                  </div>
                </>
                }
                {/* SOLO SE RENDERIZA EN NEWSECTION */}
                {showSectionsComponent &&
                  <Sections dataTotal={dataTotal} setDataTotal={setDataTotal} />
                }

                {/* ESTO ERA LOQUE TENÍAMOS PERO HE PROBADO LO ANTERIOR PARA QUE SE RENDERICEN LAS SECCIONES SOLO EN EL STEP3 Y NEWSECTION */}
                {/* {dataTotal.section_public.key_points.length !== 0 &&
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
                </div> 
                }
                <Sections dataTotal={dataTotal} setDataTotal={setDataTotal}/> */}

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
                handleSectionFile
              }}/>
            </Col>
          </Row>
        </Container>
      </section>
  )
}

export default CreateEvent;
