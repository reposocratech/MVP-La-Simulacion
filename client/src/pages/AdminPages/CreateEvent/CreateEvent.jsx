import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";
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
  start_date: null,
  end_date: null,
  start_hour: null,
  end_hour: null,
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
  const [fileError, setFileError] = useState();
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();

  const {token} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleFile = (e) => {
    const selectedFiles = e.target.files[0];

    if (selectedFiles && selectedFiles.name.length > 200) {
      setFileError(`El nombre de alguno de tus archivos es demasiado largo (máximo 200 caracteres).`);
      e.target.value = null;
      return;
    }

    setFileError(null);
    setMsgError(null);
    setCoverImg(selectedFiles);
  }

  const handleSectionFile = (sec_id, files) => {
    if (!files || files.length === 0) return;
    setSectionsImages([...sectionsImages, { sec_id, files }]);
  }

  const cancel = (e) => {
    e.preventDefault();
    setDataTotal(initialValue);
    setCoverImg();
    navigate('/admin/events');
  }

  const terminar = async() =>{
    try {
      let sections = dataTotal.sections;
      let prueba = [];
      let sectionsFinal = sections.map((elem, i)=>{
        let fotos = sectionsImages.find(e=>e.sec_id === elem.sec_id);
        prueba.push({sec_id: `section${i+1}`, files: fotos?.files}); 
        let ptosFinal = elem.key_points.map((pto, ix)=>{
          return({...pto, pto_id:ix+1 })
        });
        return(
          {...elem, sec_id: i+1, key_points:ptosFinal}
        );
      });

      let sendData = {...dataTotal, sections:sectionsFinal};

      const newFormData = new FormData();
      newFormData.append("dataTotal", JSON.stringify(sendData));
      prueba.forEach((elem)=>{
        if (elem.files !== undefined){
          let prueba2 = Array.from(elem.files);
          prueba2.forEach((e)=>{
            newFormData.append(elem.sec_id, e);
          });
        }
      });
      if (coverImg) {
        newFormData.append("cover_image", coverImg);
      }

      let res = await fetchData("/events/CreateEvent", "post", newFormData, token);
      navigate(`/event/${res.data.eventId}`);
      setDataTotal(initialValue);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="section-create-event">
      <Container>
        <h1><span>ET</span>Crear un evento/ taller</h1>
        <Row className="justify-content-between gy-4">
          <Col lg={4}>
            <article className="border-info-form shadow-sm">
              <p><span>Tipo:</span> {dataTotal.type_event ? (Number(dataTotal.type_event) === 1 ? "Evento" : "Taller") : ""}</p>
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
          <Col lg={8}>
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
              handleSectionFile,
              valError,
              setValError,
              msgError,
              setMsgError,
              fileError,
              setFileError
            }}/>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CreateEvent;
