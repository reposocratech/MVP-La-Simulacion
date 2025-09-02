const EventSection = ({ section, index }) => {
  console.log("----", section);

  const isFirst = index === 0;
  const isEven = index % 2 === 0;

  return (
    <section
      className={`event-section ${isEven ? 'even-section' : 'odd-section'}`}
    >
      <h3 className="section-title">
        {isFirst ? 'Público beneficiario' : section.section_title}
      </h3>

      <div className="section-body d-flex flex-column gap-4">
      <div className="section-gallery d-flex flex-wrap justify-content-center gap-3">
          {section.images.map((image, idx) => (
            <img
              key={idx}
              src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/events/${image.file}`}
              alt=""
              className="section-img"
            />
          ))}
        </div>
        <div className="section-content flex-fill">
          {!isFirst && section.section_subtitle && (
            <h4 className="section-subtitle">{section.section_subtitle}</h4>
          )}

          <p className="section-text">{section.section_description}</p>

          <ul className="section-keypoints">
            {section.keyPoints.map((kp) => (
              <li className="mb-2" key={kp.section_key_point_id}>
                <strong>{kp.key_point_title}</strong>{' '}
                {kp.key_point_description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
