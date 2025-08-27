import { Outlet } from "react-router"
import { NavbarAdmin } from "../components/Navbars/NavbarAdmin/NavbarAdmin"
import { Footer } from "../components/Footer/Footer"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

export const AdminLayout = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <header>
        {user && <NavbarAdmin />}        
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
