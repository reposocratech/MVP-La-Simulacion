import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { KeyPoints } from "./KeyPoints";

// import { PtosInteres } from "./PtosInteres";

export const SortableItem = ({ item, addPoInt, delPunto,  deleteSection }) => {
  
    const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.sec_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="seccion" ref={setNodeRef} style={style} {...attributes}>
      <div
        className="drag-handle"
        {...listeners}
        style={{ cursor: "grab", marginBottom: "8px" }}
      >
        ⠿ Mover
      </div>
      <div className="datos">
        <h3>Seccion:{item.section_title} </h3>
        <p>Descripción: {item.section_description} </p>
      </div>
      <div className="botones">
        <div>
          <button onClick={() => deleteSection(item.sec_id)}>
            borrar seccion
          </button>
        </div>
        <h4>Puntos de interés</h4>
        <KeyPoints delPunto={delPunto} sec={item} addPoInt={addPoInt} />
      </div>
    </div>
  );
};