import './buttonType1.css';

export const ButtonType1 = ({ children, variant = 'primary', ...props }) => {
  const className = `custom-btn1 custom-btn1-${variant}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}
