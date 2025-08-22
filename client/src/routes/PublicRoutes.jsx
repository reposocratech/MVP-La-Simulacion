import { useContext } from "react"
import { Outlet } from "react-router"
import { AuthContext } from "../context/AuthContextProvider"


export const PublicRoutes = () => {
  const {loading} = useContext(AuthContext);
  return (
    <>
     {!loading && <Outlet />}
    </>
  )
}
