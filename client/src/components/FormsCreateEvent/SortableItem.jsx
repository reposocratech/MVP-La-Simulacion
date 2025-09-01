import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { KeyPoints } from "./KeyPoints";
import { Col, Row } from "react-bootstrap";

export const SortableItem = ({ item, addPoInt, delPunto,  deleteSection }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.sec_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <section className="section-sections p-3 bg-color-secondary-light-pink rounded-4" ref={setNodeRef} style={style} {...attributes}>
      <div className="mb-3 d-flex justify-content-between">
        <div
          className="fw-bold"
          {...listeners}
          style={{ cursor: "grab", marginBottom: "8px" }}
        >
          ⠿ Mover
        </div>
        <div>
          <button 
            className="btn-table block"
            onClick={() => deleteSection(item.sec_id)}
          >Borrar sección</button>
        </div>
      </div>

      <Row className="flex-column gy-3">
        <Col>
          <div>
            <h3>{item.section_title} </h3>
            <p className="fw-bold">{item.section_subtitle}</p>
            <p>{item.section_description} </p>
            <p>{item.duration}</p>
          </div>
        </Col>
        <Col>
          <KeyPoints delPunto={delPunto} sec={item} addPoInt={addPoInt} />
        </Col>
      </Row>
    </section>
  );
};