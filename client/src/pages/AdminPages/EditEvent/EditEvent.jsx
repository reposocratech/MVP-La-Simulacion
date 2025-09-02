import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet, useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import './editEvent.css';
import { SectionList } from "../../../components/FormsEditEvent/SectionList";
import { EditDataEvent } from "../../../components/FormsEditEvent/EditDataEvent";
import { EditDataSection } from "../../../components/FormsEditEvent/EditDataSection";

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

const EditEvent = () => {
  const [dataTotal, setDataTotal] = useState(initialValue);
  const [sectionsImages, setSectionsImages] = useState([]);
  const [currentForm, setCurrentForm] = useState(1);
  const [selectedSectionId, setSelectedSectionId] = useState();
  
  const {token} = useContext(AuthContext);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchEvent = async() => {
      try {
        const res = await fetchData(`/events/editEvent/${id}`, "get", null, token);
        console.log(res);
        
        setDataTotal(res.data);
        console.log(res.data.sections)
      } catch (error) {
        console.log(error);
      }
    }
    fetchEvent();
  }, [id, token]);

  const handleSectionFile = (sec_id, files) => {
    setSectionsImages([...sectionsImages, {sec_id, files}]);
  }

  const cancelEditSection = (e) => {
    e.preventDefault();
    setDataTotal(initialValue);
    navigate('/admin/events');
  }

  const submitEditEvent = async(event, file) => {
    try {
      const newFormData= new FormData();
      let dataToSend = {...dataTotal, ...event};
      newFormData.append("data", JSON.stringify(dataToSend));
  
      if (file) {
        newFormData.append("file", file);
      }
  
      let result = await fetchData(`/events/editData/${id}`, "put", newFormData, token);
      if (result.data.filename){
        setDataTotal({...dataToSend, cover_image: result.data.filename});
      } else {
        setDataTotal(dataToSend)
      }
      setCurrentForm(1);
    } catch (error) {
      console.log(error);
    } 
  }

  console.log("datatotallll", dataTotal);
  
  const submitEditSection = async(section) => {
    try {
      const res = await fetchData(`/events/editSection`, "put", {section, event_id: id}, token);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="section-create-event">
      <Container>
        <h1><span>ET</span>Editar un evento/ taller</h1>
        <Row className="justify-content-between gy-4">
          <Col lg={4}>
            <article className="border-info-form shadow-sm">
              <p><span>Tipo:</span> {dataTotal.type_event ? (Number(dataTotal.type_event) === 1 ? "Evento" : "Taller") : ""}</p>
              <p><span>Título:</span> {dataTotal.event_title}</p>
              <p><span>Descripción:</span> {dataTotal.event_description}</p>
              <p><span>Localización:</span> {dataTotal.location}</p>
              {/* <p><span>Imagen:</span> {coverImg?.name}</p> */}
              <p><span>Imagen:</span> </p>
              <p><span>Duración Total:</span> {dataTotal.duration}</p>
              <p><span>Fecha de inicio:</span> {dataTotal.start_date}</p>
              <p><span>Fecha de fin:</span> {dataTotal.end_date}</p>
              <p><span>Hora de inicio:</span> {dataTotal.start_hour}</p>
              <p><span>Hora de fin:</span> {dataTotal.end_hour}</p>
              <p><span>Número de asistentes:</span> {dataTotal.number_of_attendees}</p>
              <p><span>Coste Total:</span> {dataTotal.price}</p>
              <p><span>Enlace ticketera:</span> {dataTotal.ticket_link}</p>
              <button
                onClick={() => setCurrentForm(2)}
                disabled={currentForm === 2}
              >Editar evento</button>
            </article>
          </Col>
          <Col lg={8}>
            {currentForm === 1 &&
              <SectionList  
                sections={dataTotal.sections}
                setCurrentForm={setCurrentForm}
                setSelectedSectionId={setSelectedSectionId}
              />
            }
            {currentForm === 2 &&
              <EditDataEvent 
                dataEvent={{
                  type_event: dataTotal.type_event,
                  event_title: dataTotal.event_title,
                  event_description: dataTotal.event_description,
                  location: dataTotal.location,
                  duration: dataTotal.duration,
                  start_date: dataTotal.start_date,
                  end_date: dataTotal.end_date, 
                  start_hour: dataTotal.start_hour,
                  end_hour: dataTotal.end_hour, 
                  number_of_attendees: dataTotal.number_of_attendees,
                  price: dataTotal.price, 
                  ticket_link: dataTotal.ticket_link
                }}
                onSubmit={submitEditEvent}
                cancel={() => setCurrentForm(1)}
              />
            }
            {currentForm === 3 &&
              <EditDataSection 
                dataSections={dataTotal.sections}
                selectedSectionId={selectedSectionId}
                onSubmit={submitEditSection}
                cancel={() => setCurrentForm(1)}
              />
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default EditEvent;
