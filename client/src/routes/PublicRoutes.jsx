import { useContext } from "react"
import { Outlet } from "react-router"
import { AuthContext } from "../context/AuthContextProvider"


export const PublicRoutes = () => {
  const {user, loading} = useContext(AuthContext);
  return (
    <>
     {!user && !loading && <Outlet />}
    </>
  )
}
