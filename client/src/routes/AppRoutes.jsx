import { lazy, useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthContext } from '../context/AuthContextProvider';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminLayout } from '../layouts/AdminLayout';



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

// Componentes Administrador:
const CreateRoom1 = lazy(()=>import('../pages/AdminPages/CreateRoom/CreateRoom1'))

export const AppRoutes = () => {

  const {loading} = useContext(AuthContext);

  return (
    <>{loading?<h1>Cargando...</h1>:
      <BrowserRouter>
        
        <Routes>
          {/* Rutas Públicas: */}
          <Route element={< PublicRoutes/>}>
            <Route element={< PublicLayout />}>
              <Route path='/' element={< Home />} />
              <Route path='/about' element={< About />} />
              <Route path='/contact' element={< Contact />} />
              <Route path='/services' element={< Services />} />
              <Route path='/servicesCoop' element={< ServicesCoop />} />
              <Route path='/events' element={< Events />} />
              <Route path='/rooms' element={< Rooms />} />
              <Route path='/register' element={< Register />} />
              <Route path='/login' element={< Login />} />
            </Route>
          </Route>

          {/* Rutas de Administrador: */}
         <Route element={< PrivateRoutes />}>
          <Route element={< AdminLayout />}>
            <Route path='/admin/createroom1' element={< CreateRoom1 />}/>
          </Route>
         </Route>


          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>}
    </>

  )
}
