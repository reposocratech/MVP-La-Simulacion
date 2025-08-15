import { lazy } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import { PublicLayout } from '../layouts/PublicLayout';


// Componentes públicos:
const Home = lazy(()=>import('../pages/PublicPages/Home/Home'));
const About = lazy(()=>import('../pages/PublicPages/About/About'));
const Contact = lazy(()=>import('../pages/PublicPages/Contact/Contact'));
const Services = lazy(()=>import('../pages/PublicPages/Services/Services'));
const ServicesCoop = lazy(()=>import('../pages/PublicPages/ServicesCoop/ServicesCoop'));
const Events = lazy(()=>import('../pages/PublicPages/Events/Events'));
const Rooms = lazy(()=>import('../pages/PublicPages/Rooms/Rooms'));
const Register = lazy(()=>import('../pages/PublicPages/Register/Register'));
const Login = lazy(()=>import('../pages/PublicPages/Login/Login'));
const ErrorPage = lazy(()=>import('../pages/PublicPages/ErrorPage/ErrorPage'));


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Rutas Públicas: */}
      <Routes>
        <Route>
          <Route element={< PublicLayout />}>
            <Route path='/' element={< Home />} />
            <Route path='/about' element={< About />} />
            <Route path='/contact' element={< Contact />} />
            <Route path='/services' element={< Services />} />
            <Route path='/serviceCoop' element={< ServicesCoop />} />
            <Route path='/events' element={< Events />} />
            <Route path='/rooms' element={< Rooms />} />
            <Route path='/register' element={< Register />} />
            <Route path='/login' element={< Login />} />
        </Route>
        </Route>

        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
