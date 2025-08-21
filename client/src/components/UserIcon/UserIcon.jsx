import { useNavigate } from 'react-router'

import './userIcon.css'

export const UserIcon = ({userType}) => {

  const navigate = useNavigate(); 

  //Función para que al pulsar en el UserIcon, nos redirija al peril o al panel de Admin, en función del tipo de usuario:
  const onClickIcon = () => {
    if(userType === 1) navigate("/admin/AdminPanel"); //admin
    if(userType === 2) navigate("/servicesCoop"); // user normal
    //TODO: Sustituir esta 2ª ruta por la que va al profile del user
  }
  
  return (
    <div className="me-2">
      <button className="avatar-button" onClick={onClickIcon}>
        <img src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/default-avatar.svg`} 
              alt="Ir a mi perfil de usuario"
              className="avatar-icon" />
      </button>
    </div>
  )
}
