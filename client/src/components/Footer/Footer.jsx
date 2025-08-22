import facebook from '../../assets/icons/facebook.svg';
import instagram from '../../assets/icons/instagram.svg';
import linkedin from '../../assets/icons/linkedin.svg';
import tiktok from '../../assets/icons/tiktok.svg';
import genkoa from '../../assets/icons/logo-genkoa-redes-negativo.png'

import './footer.css';

export const Footer = () => {
  return (
    <div className="web-footer d-flex justify-content-around py-2 flex-wrap gap-3">
      <div className="socialmedia-icons d-flex gap-4 align-items-center mx-4 flex-wrap">
          <a href="https://www.linkedin.com/company/lasimulacion/" target="_blank" rel="noopener noreferrer">
              <img className="sm-icon"
                    src={linkedin} alt="Ir al perfil de Linkedin de La Simulación" />
          </a>
          <a href="https://www.facebook.com/lasimulacion/" target="_blank" rel="noopener noreferrer">
              <img className="sm-icon"
                    src={facebook} alt="Ir al perfil de Facebook de La Simulación" />
          </a>
          <a href="https://www.instagram.com/la.simulacion/" target="_blank" rel="noopener noreferrer">
              <img className="sm-icon"
                    src={instagram} alt="Ir al perfil de Instagram de La Simulación" />
          </a>
          <a href="https://www.tiktok.com/@la.simulacion" target="_blank" rel="noopener noreferrer">
              <img className="sm-icon"
                    src={tiktok} alt="Ir al perfil de TikTok de La Simulación" />
          </a>
          <a href="https://genkoa.com/" target="_blank" rel="noopener noreferrer">
              <img className="sm-icon"
                    src={genkoa} alt="Ir a la web de Genkoa" />
          </a>
      </div>
      <div className="texts-footer d-flex gap-4 align-items-center">
        <p className="m-0"><small>Política de Privacidad</small></p>
        <p className="m-0"><small>Términos y condiciones</small></p>
        <p className="m-0"><small>Política de Privacidad</small></p>
        <p className="m-0"><small>©2025 La Simulación</small></p>
      </div>
    </div>
  )
}
