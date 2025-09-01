const EventSection = ({ section, index , timeEvent }) => {
  if (!section) return null

  const isFirst = index === 0
  const isEven = index % 2 === 0
  const orientationClass = isEven ? 'flex-md-row' : 'flex-md-row-reverse'

  return (
    <section
      className={`event-section ${isEven ? 'even-section' : 'odd-section'}`}
    >
      <h3 className="section-title">
        {isFirst ? 'Público beneficiario' : section.section_title}
      </h3>

      <div
        className={`section-body d-flex flex-column ${orientationClass} gap-4`}
      >
        {section.images && section.images.length > 0 && (
          <div className="flex-fill section-gallery">
            {section.images.map((file, idx) => (
              <img
                key={idx}
                src={`${
                  import.meta.env.VITE_SERVER_URL_PUBLIC
                }images/events/${file}`}
                alt=""
                className="section-img"
              />
            ))}
          </div>
        )}
        <div className="flex-fill">
          {!isFirst && section.section_subtitle && (
            <h4 className="section-subtitle">{section.section_subtitle}</h4>
          )}
          <p className="section-text">{section.section_description}</p>
          {section.key_points && section.key_points.length > 0 && (
            <ul className="section-keypoints">
              {section.key_points.map((kp) => (
                <li key={kp.section_key_point_id}>
                  <strong>{kp.key_point_title}:</strong>{' '}
                  {kp.key_point_description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default EventSection
