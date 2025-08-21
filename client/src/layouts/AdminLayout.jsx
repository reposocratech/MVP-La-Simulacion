import { Outlet } from "react-router"
import { NavbarAdmin } from "../components/Navbars/NavbarAdmin/NavbarAdmin"
import { Footer } from "../components/Footer/Footer"

export const AdminLayout = () => {
  return (
    <>
      <header>
        <NavbarAdmin />
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
