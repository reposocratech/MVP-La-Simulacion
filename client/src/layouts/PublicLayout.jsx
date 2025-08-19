import { Outlet } from "react-router"
import { NavbarPublic } from "../components/Navbars/NavbarPublic/NavbarPublic"
import { NavbarUser } from "../components/Navbars/NavbarUser/NavbarUser"
import { NavbarAdmin } from "../components/Navbars/NavbarAdmin/NavbarAdmin"

export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic />
        <NavbarUser />
        <NavbarAdmin />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        Footer
      </footer>
    </>
  )
}
