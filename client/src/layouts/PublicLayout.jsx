import { Outlet } from "react-router"
import { NavbarPublic } from "../components/Navbars/NavbarPublic/NavbarPublic"

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
        Footer
      </footer>
    </>
  )
}
