import { lazy, Suspense, useContext } from 'react';
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
const OneRoom = lazy(() => import('../pages/PublicPages/oneRoom/OneRoom'));
const Register = lazy(()=>import('../pages/PublicPages/Register/Register'));
const Login = lazy(()=>import('../pages/PublicPages/Login/Login'));
const ErrorPage = lazy(()=>import('../pages/PublicPages/ErrorPage/ErrorPage'));

  // Componentes Administrador:
const AdminPanel = lazy(()=>import('../pages/AdminPages/AdminPanel/AdminPanel'));
const CreateRoom = lazy(()=>import('../pages/AdminPages/CreateRoom/CreateRoom'));
const EditRoom = lazy(()=>import('../pages/AdminPages/EditRoom/EditRoom'));
const CreateServCoop = lazy(()=>import('../pages/AdminPages/CreateServCoop/CreateServCoop'));
const EditServCoop = lazy(()=>import('../pages/AdminPages/EditServCoop/EditServCoop'))
const AdminUsers = lazy(() => import('../pages/AdminPages/AdminUsers/AdminUsers'));
const UserProfile = lazy(() => import('../pages/AdminPages/UserProfile/UserProfile'));
const AdminAdmins = lazy(() => import('../pages/AdminPages/AdminAdmins/AdminAdmins'));

  // Componentes de Usuario:
const Profile = lazy(() => import('../pages/UserPages/Profile/Profile'));
const RoomReservation = lazy(()=>import('../pages/UserPages/RoomReservation/RoomReservation'));


export const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
         <div className="d-flex flex-column mt-5 align-items-center">
          <SpinnerLoading />
          <h1 className="fs-5 mt-3">Ya casi estamos...</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Suspense fallback={
                      <div className="d-flex flex-column mt-5 align-items-center">
                        <SpinnerLoading />
                        <h1 className="fs-5 mt-3">Ya casi estamos...</h1>
                      </div>
                    }>
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
                  <Route path="/oneRoom/:id" element={<OneRoom />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Route>
              </Route>

            {/* Rutas Privadas de Administrador: */}
            <Route element={< PrivateRoutes userType={user?.type} requiredUser={1}/>}/>
              <Route element={< AdminLayout />}>
                <Route path='/admin/createRoom' element={< CreateRoom />}/>
                <Route path='/admin/editRoom/:id' element={< EditRoom />}/>
                <Route path='/admin/createServCoop' element={< CreateServCoop />}/>
                <Route path='/admin/editServCoop' element={< EditServCoop />}/>
                <Route path='/admin/adminPanel' element={< AdminPanel />}/>
                <Route path='/admin/users' element={<AdminUsers />}/>
                <Route path='/admin/userProfile/:id' element={<UserProfile />}/>
                <Route path='/admin/admins' element={<AdminAdmins />}/>
              </Route>

            {/* Rutas Privadas de Usuario: */}
            <Route
              element={<PrivateRoutes userType={user?.type} requiredUser={2} />}
            >
              <Route element={<UserLayout />}>
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/roomReservation" element={<RoomReservation />}/>
              </Route>
            </Route>

            {/* Ruta a la página de error (cuando la ruta del navegador no exista, entrará aquí ): */}
            <Route path='*' element={<ErrorPage />}/>
          </Routes>
        </Suspense>
      </BrowserRouter>)
      }
    </>
  )
}
