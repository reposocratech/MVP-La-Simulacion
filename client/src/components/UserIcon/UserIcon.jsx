import { useNavigate } from 'react-router'

import './userIcon.css'


export const UserIcon = ({ navbarData }) => {
  const { userName, userType, userAvatar } = navbarData;
  const navigate = useNavigate();
  
  // Función para que al pulsar en el UserIcon, nos redirija al peril o al panel de Admin, en función del tipo de usuario:
  const onClickIcon = () => {
    if(userType === 1) navigate("/admin/AdminPanel"); //admin
    if(userType === 2) navigate("/user/profile"); // user normal
  }

  //Función para mostrar o bien el nombre, o bien otra expresión, según la logintud del nombre del usuario:
  const showTextContent = () => {
    let textContent;

    if (userType === 1){
      textContent = <p className="my-0 ms-2">Panel Admin</p>;
    }
    else if (userType === 2 && userName.length <= 20){
      textContent = <p className="my-0 ms-2">{userName}</p>;
    }
    else if (userType === 2 && userName.length > 20){
      textContent = <p className="my-0 ms-2">Tu perfil</p>;
    }
    return textContent;
  }
  
  return (
    <>
      <button className="avatar-button d-flex align-items-center" onClick={onClickIcon}>
            {userType === 1 ? (
              <img
                src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/avatar-admin-favicon.webp`}
                alt="Ir al panel de administración"
                className="avatar-icon"
              />
            ) : userAvatar ? (
              <img
                src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/${userAvatar}`}
                alt="Ir a mi perfil de usuario"
                className="avatar-icon"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_SERVER_URL_PUBLIC}images/users/default-avatar.svg`}
                alt="Ir a mi perfil de usuario"
                className="avatar-icon"
              />
            )}
 
            {
              showTextContent()
            }

            
      </button> 
    </>
  )
}
