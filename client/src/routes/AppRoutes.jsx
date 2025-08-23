import { lazy, useContext } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthContext } from '../context/AuthContextProvider';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout'
import { SpinnerLoading } from '../components/SpinnerLoading/SpinnerLoading';

// Importaciones "carga perezosa":
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
const AdminPanel = lazy(()=>import('../pages/AdminPages/AdminPanel/AdminPanel'));
const CreateRoom = lazy(()=>import('../pages/AdminPages/CreateRoom/CreateRoom'));

  // Componentes de Usuario:
const Profile = lazy(() => import('../pages/UserPages/Profile/Profile'))
export const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
         <div className="d-flex flex-column justify-content-center align-items-center">
          <SpinnerLoading />
          <h1 className="fs-5 mt-3">En seguida estamos...</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Rutas Públicas: */}
            <Route element={<PublicRoutes />}>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                <Route path="/servicesCoop" element={<ServicesCoop />} />
                <Route path="/events" element={<Events />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
            </Route>

          {/* Rutas de Administrador: */}
         <Route element={< PrivateRoutes />}>
          <Route element={< AdminLayout />}>
          <Route path='/admin/createRoom' element={< CreateRoom />}/>
          <Route path='/admin/adminPanel' element={< AdminPanel />}/>
          </Route>
         </Route>

          {/* Rutas Privadas de Usuario: */}
          <Route
            element={<PrivateRoutes userType={user?.type} requiredUser={2} />}
          >
            <Route element={<UserLayout />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Ruta a la página de error (cuando la ruta del navegador no exista, entrará aquí ): */}
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>)
      } 
    </>
  )
}
