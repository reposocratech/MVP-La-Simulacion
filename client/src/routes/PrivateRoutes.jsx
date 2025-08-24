import { useContext } from "react";
import { Outlet, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContextProvider";
import { useEffect } from "react";


export const PrivateRoutes = ({userType, requiredUser}) => {

  const navigate = useNavigate();

  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (userType !== requiredUser){
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {user && <Outlet />}
    </>
  )
}
