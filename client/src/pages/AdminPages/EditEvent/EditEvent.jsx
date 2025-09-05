import { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContextProvider";
import { fetchData } from "../../../helpers/axiosHelper";
import { SectionList } from "../../../components/FormsEditEvent/SectionList";
import { EditDataEvent } from "../../../components/FormsEditEvent/EditDataEvent";
import { EditDataSection } from "../../../components/FormsEditEvent/EditDataSection";
import { validateForms } from "../../../helpers/validateForms";
import { editEventSchema } from "../../../schemas/editEventSchema";
import { createEventSectionSchema } from "../../../schemas/createEventSectionSchema";
import './editEvent.css';

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
  section_public: { key_points: [], section_title: "Público beneficiario" },
  sections: []
};

const EditEvent = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL_PUBLIC;

  const [dataTotal, setDataTotal] = useState(initialValue);
  const [sectionsImages, setSectionsImages] = useState([]);
  const [currentForm, setCurrentForm] = useState(1);
  const [selectedSectionId, setSelectedSectionId] = useState();
  const [refresh, setRefresh] = useState(true);
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [fileError, setFileError] = useState();

  const { token } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetchData(`/events/editEvent/${id}`, "get", null, token);

        const evento = {
          ...res.data,
          start_hour: res.data.start_hour ? res.data.start_hour.slice(0, 5) : "",
          end_hour: res.data.end_hour ? res.data.end_hour.slice(0, 5) : "",
          type_event: res.data.type_event ? String(res.data.type_event) : "",
        };

        setDataTotal(evento);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [id, token, sectionsImages, refresh]);

  const handleSectionFile = (sec_id, event) => {
    const files = Array.from(event.target.files);
    setSectionsImages(files);
  };

  const submitEditEvent = async (event, file) => {
    try {
      // Convertimos type_event a string y normalizamos horas
      const normalizeHour = (h) => (h && h.length === 5 ? `${h}:00` : h);

      let dataToValidate = {
        ...dataTotal,
        ...event,
        type_event: String(event.type_event),
      };

      const { valid, errors } = validateForms(editEventSchema, dataToValidate);
      setValError(errors);

      if (!valid) {
        console.warn("Errores de validación:", errors);
        return;
      }

      let dataToSend = {
        ...dataToValidate,
        start_hour: normalizeHour(dataToValidate.start_hour),
        end_hour: normalizeHour(dataToValidate.end_hour),
      };

      const newFormData = new FormData();
      newFormData.append("data", JSON.stringify(dataToSend));

      if (file) {
        newFormData.append("file", file);
      }

      const result = await fetchData(`/events/editData/${id}`, "put", newFormData, token);

      if (result.data.filename) {
        setDataTotal({ ...dataToSend, cover_image: result.data.filename });
      } else {
        setDataTotal(dataToSend);
      }

      setCurrentForm(1);
    } catch (error) {
      console.log(error);
      setMsgError(error?.response?.data?.message || "Algo salió mal, inténtelo de nuevo");
    }
  };

  const submitEditSection = async (section) => {
    const { valid, errors } = validateForms(createEventSectionSchema, section);
    setValError(errors);

    try {
      if (valid) {
        const res = await fetchData(`/events/editSection`, "put", { section, event_id: id }, token);
        setRefresh(!refresh);

        setDataTotal(prev => ({
          ...prev,
          sections: prev.sections.map(sec => sec.section_id === section.section_id ? section : sec)
        }));
        setCurrentForm(1);
        setValError({});
        setMsgError();
      }
    } catch (error) {
      console.log(error);
      setMsgError(error?.response?.data?.message || 'Algo salió mal, inténtelo de nuevo');
    }
  };

  const deleteSection = async (sectionId, images = []) => {
    try {
      const files = images.map(img => img.file);
      await fetchData(`/events/deleteSection/${sectionId}`, "delete", { files }, token);
      setDataTotal(prev => ({
        ...prev,
        sections: prev.sections.filter(sec => sec.section_id !== sectionId)
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-create-event">
      <Container>
        <h1><span>ET</span>Editar un evento/ taller</h1>
        <Row className="justify-content-between gy-4">
          <Col lg={4}>
            <article className="border-info-form shadow-sm">
              <p className="mb-0"><span>Imagen de portada:</span></p>
              <div className="w-75 mb-3">
                <img src={`${serverUrl}images/events/${dataTotal.cover_image}`} alt="" className="w-100 rounded-3"/>
              </div>
              <p><span>Tipo:</span> {dataTotal.type_event === "1" ? "Evento" : dataTotal.type_event === "2" ? "Taller" : ""}</p>
              <p><span>Título:</span> {dataTotal.event_title}</p>
              <p><span>Descripción:</span> {dataTotal.event_description}</p>
              <p><span>Localización:</span> {dataTotal.location}</p>
              <p><span>Duración Total:</span> {dataTotal.duration}</p>
              <p><span>Fecha de inicio:</span> {dataTotal.start_date}</p>
              <p><span>Fecha de fin:</span> {dataTotal.end_date}</p>
              <p><span>Hora de inicio:</span> {dataTotal.start_hour}</p>
              <p><span>Hora de fin:</span> {dataTotal.end_hour}</p>
              <p><span>Número de asistentes:</span> {dataTotal.number_of_attendees}</p>
              <p><span>Coste Total:</span> {dataTotal.price}</p>
              <p><span>Enlace ticketera:</span> {dataTotal.ticket_link}</p>
              <div className="text-center mt-4">
                <button
                  className="lavender-button"
                  onClick={() => setCurrentForm(2)}
                  disabled={currentForm === 2}
                >Editar evento</button>
              </div>
            </article>
          </Col>
          <Col lg={8}>
            {currentForm === 1 &&
              <SectionList
                sections={dataTotal.sections}
                setCurrentForm={setCurrentForm}
                setSelectedSectionId={setSelectedSectionId}
                selectedSectionId={selectedSectionId}
                sectionsImages={sectionsImages}
                setSectionsImages={setSectionsImages}
                handleSectionFile={handleSectionFile}
                event_id={id}
                setRefresh={setRefresh}
                refresh={refresh}
                deleteSection={deleteSection}
                fileError={fileError}
                setFileError={setFileError}
              />
            }
            {currentForm === 2 &&
              <EditDataEvent
                dataEvent={dataTotal}
                onSubmit={submitEditEvent}
                cancel={() => setCurrentForm(1)}
                valError={valError}
                msgError={msgError}
                fileError={fileError}
                setFileError={setFileError}
                setValError={setValError}
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
                valError={valError}
                msgError={msgError}
              />
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditEvent;
