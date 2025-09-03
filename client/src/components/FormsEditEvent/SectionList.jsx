import { HiTrash } from "react-icons/hi";
import { fetchData } from "../../helpers/axiosHelper";
import { Col, Row } from "react-bootstrap";
import { EditModalKeyPoints } from "./EditModalKeyPoints";
import { useContext, useState } from "react";
import { useParams } from 'react-router';
import { AuthContext } from "../../context/AuthContextProvider";
import { ModalAddImgSection } from "./ModalAddImgSection";

const initialValue = {
  key_point_title: "",
  key_point_description: ""
};

export const SectionList = ({ sections, setCurrentForm, event_id, selectedSectionId, setSelectedSectionId, sectionsImages, setSectionsImages, handleSectionFile, setRefresh, refresh, deleteSection}) => {

  const [showForm, setShowForm] = useState(false);
  const [keyPoint, setKeyPoint] = useState(initialValue);
  const [takeSeccId, setTakeSeccId] = useState();
  const [valError, setValError] = useState({});
  const [msgError, setMsgError] = useState();
  const [showModalImg, setShowModalImg] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL_PUBLIC;
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const openEdit = (id_of_section) => {
    setSelectedSectionId(id_of_section);

    let sectionFound = sections.find((sect) => sect.section_id === id_of_section);

    if (sectionFound) {
      setSectionsImages(sectionFound.images || []);
    } else {
      setSectionsImages([]);
    }
    setCurrentForm(3);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyPoint({ ...keyPoint, [name]: value });
  };

  const handleClose = () => {
    setShowForm(false);
    setKeyPoint(initialValue);
  };

  const openModalAddImages = (section_id) => {
    setSelectedSectionId(section_id);
    setShowModalImg(true);
  };

  const deleteImgSection = async (event_id, section_id, section_image_id, file) => {
    const data = { event_id, section_id, section_image_id, file };

    try {
      await fetchData("/events/delSectionImage", "delete", data, token);
      setSectionsImages(sectionsImages.filter((elem) => elem.section_image_id !== section_image_id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseFile = () => {
    setShowModalImg(false);
  };

  const keypointsDelete = async (sections) => {
    try {
      const res = await fetchData("/events/delkeypoint", "put", { key_point_id: sections.section_key_point_id }, token);
      console.log(res);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error al borrar ", error);
    }
  };

  const keypointsAdd = async () => {
    try {
      const res = await fetchData(`/events/addkeypoint/${id}`, "put", { section_id: takeSeccId.section_id, keyPoint }, token);
      console.log(res);
      setShowForm(false);
      setRefresh(!refresh);
      setKeyPoint(initialValue);
      setCurrentForm(1);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const addImgSectionSubmit = async () => {
    try {
      const newFormData = new FormData();

      newFormData.append('event_id', event_id);
      newFormData.append('section_id', selectedSectionId);

      if (sectionsImages.length) {
        for (const elem of sectionsImages) {
          newFormData.append("file", elem);
        }
      }

      await fetchData('/events/addSectionImages', "put", newFormData, token);
      setRefresh(!refresh);
      handleCloseFile();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        {sections.map(elem => (
          <section className="section-sections mb-3" key={elem.section_id}>
            <div className="d-flex justify-content-between">
              <h3>{elem.section_title}</h3>
              {elem.section_id !== 1 && (
                <div>
                  <button
                    className="btn-table block"
                    onClick={() => deleteSection(elem.section_id, elem.images)}
                  >Borrar sección</button>
                </div>
              )}
            </div>
            <p>{elem.section_subtitle}</p>
            <p>{elem.section_description}</p>
            <p>{elem.section_duration}</p>
            <div className="d-flex gap-3 mb-4">
              {elem.section_id !== 1 && 
                <>
                <button
                  className="btn-table edit"
                  onClick={() => { setTakeSeccId(elem); openEdit(elem.section_id); }}
                >Editar sección</button>
                <button
                  onClick={() => openModalAddImages(elem.section_id)}
                  className="btn-table"
                >Añadir Imágenes</button>
                </>
              }
              <button
                className="btn-table"
                onClick={() => { setTakeSeccId(elem); setShowForm(true); }}
              >Añadir punto clave</button>
            </div>

            <Row className="g-3">
              {elem.images?.map(img => (
                <Col lg={3} key={img.section_image_id}>
                  <div className="position-relative">
                    <img
                      src={`${serverUrl}images/events/${img.file}`}
                      alt={img.file}
                      className="w-100 rounded-3"
                    />
                    <button
                      className="delete-button-icon position-absolute top-0 end-0 m-2 bg-light rounded-2"
                      onClick={() => deleteImgSection(event_id, img.section_id, img.section_image_id, img.file)}
                    >
                      <HiTrash size={20} />
                    </button>
                  </div>
                </Col>
              ))}
            </Row>

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
          </section>
        ))}

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

      {showModalImg && (
        <ModalAddImgSection
          handleSectionFile={handleSectionFile}
          handleCloseFile={handleCloseFile}
          show={showModalImg}
          selectedSectionId={selectedSectionId}
          onSubmit={addImgSectionSubmit}
        />
      )}
    </>
  );
};
