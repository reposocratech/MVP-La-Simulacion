import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from './SortableItem';
import { useEffect, useState } from "react";

export const Sections = ({dataTotal, setDataTotal}) => {

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    setItems(dataTotal.sections);
  }, [dataTotal]);

    const deleteSection = (i) => {
    console.log(i);
    const newSections = items.filter((e)=>e.sec_id !== i);

    setItems(newSections);
    setDataTotal((prev)=>({...prev, sections:newSections}));

  };

  const addPoInt = (ptos, sec_id) => {
    const newSections = dataTotal.sections.map((e) => {
      if (e.sec_id === sec_id) {
        return { ...e, key_points: ptos };
      } else {
        return e;
      }
    });

    setDataTotal({ ...dataTotal, sections: newSections });
  };

  const delPunto =  (id, sec_id) => {
    console.log(id, sec_id);
    
     const newSections = dataTotal.sections.map((e) => {
      if (e.sec_id === sec_id) {
        return { ...e, key_points: e.key_points.filter(e=>e.pto_id != id)};
      } else {
        return e;
      }
    });

    setDataTotal(prev=>({ ...prev, sections: newSections }));
  }

  // Sensores para mouse y teclado
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.sec_id === active.id);
      const newIndex = items.findIndex((item) => item.sec_id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      setDataTotal((prev) => ({ ...prev, sections: newOrder }));
    }
  };

  console.log(items);

  return (
    <div className="secciones">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.sec_id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => {
            return (
              <SortableItem
                key={item.sec_id}
                item={item}
                deleteSection={deleteSection}
                delPunto={delPunto}
                addPoInt={addPoInt}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}
