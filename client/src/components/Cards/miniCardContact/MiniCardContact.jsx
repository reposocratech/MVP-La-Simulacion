
export const MiniCardContact = ({ card }) => {
  return (
    <div 
      className={`p-4 rounded-4 d-flex flex-column align-items-center text-center gap-4 text-white h-100`}
      style={{ backgroundColor: card.bgColor }}
    >
      <span>{card.icon}</span>
      <span className="fs-5 fw-bold">{card.title}</span>
      <span>{card.subtitle}</span>
    </div>
  )
}
