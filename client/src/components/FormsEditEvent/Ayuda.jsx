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
  const [refresh, setRefresh] = useState(true)
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
  }, [id, token , refresh ]);
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
      setCurrentForm(1);
      setRefresh(!refresh)
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
                setRefresh={setRefresh}
                refresh={refresh}
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
                setRefresh={setRefresh}
                refresh={refresh}
              />
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default EditEvent;





21:03
import { HiTrash } from "react-icons/hi";
import { fetchData } from "../../helpers/axiosHelper";
import { EditModalKeyPoints } from "./EditModalKeyPoints";
import { useState } from "react";
import { useParams } from 'react-router';
const initialValue = {
 key_point_title:"",
 key_point_description:""
}
export const SectionList = ({sections, setCurrentForm, setSelectedSectionId , token ,setRefresh , refresh}) => {
  const [showForm, setShowForm] = useState(false);
  const [keyPoint, setKeyPoint] = useState(initialValue);
  const [takeSeccId, setTakeSeccId] = useState()
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
 const {id} = useParams()
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
21:04
import { Form, Modal } from "react-bootstrap";
export const EditModalKeyPoints = ({show, handleClose, onSubmit, keyPoint, handleChange, valError, msgError}) => {
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añade punto clave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="formBasicKeyTitle">
              <Form.Control
                type="text"
                placeholder="Título del punto clave"
                onChange={handleChange}
                value={keyPoint.key_point_title}
                name="key_point_title"
              />
              {valError.key_point_title && <p className="text-danger fw-bold">{valError.key_point_title}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicKeyDesc">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Descripción del punto clave"
                onChange={handleChange}
                value={keyPoint.key_point_description}
                name="key_point_description"
              />
              {valError.key_point_description && <p className="text-danger fw-bold">{valError.key_point_description}</p>}
            </Form.Group>
            {msgError && <p className="text-danger">{msgError}</p>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-table block"
            onClick={handleClose}
          >Cancelar</button>
          <button
            className="btn-table unblock"
            onClick={onSubmit}
          >Aceptar</button>
        </Modal.Footer>
      </Modal>
  )
}