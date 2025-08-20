import { Outlet } from "react-router"
import { NavbarPublic } from "../components/Navbars/NavbarPublic/NavbarPublic"
import { Footer } from "../components/Footer/Footer"

export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic />
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
