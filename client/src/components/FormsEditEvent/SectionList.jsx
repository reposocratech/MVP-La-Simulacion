

export const SectionList = ({sections, setCurrentForm, setSelectedSectionId}) => {
  const openEdit = (id) => {
    setSelectedSectionId(id);
    setCurrentForm(3);
  }

  return (
    <div>
      {
        sections.map(elem => (
          <div className="border border-1 m-2 p-2" key={elem.section_id}>
            <p>{elem.section_title}</p>
            <p>{elem.section_subtitle}</p>
            <p>{elem.section_description}</p>
            <p>{elem.section_duration}</p>
            <button
              onClick={() => openEdit(elem.section_id)}
            >Editar</button>
          </div>
        ))
      }
    </div>
  )
}
