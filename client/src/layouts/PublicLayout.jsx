import { Outlet } from "react-router"
import { NavbarPublic } from "../components/Navbars/NavbarPublic/NavbarPublic"
import { Footer } from "../components/Footer/Footer"
import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { NavbarAdmin } from "../components/Navbars/NavbarAdmin/NavbarAdmin"
import { NavbarUser } from "../components/Navbars/NavbarUser/NavbarUser"

export const PublicLayout = () => {

  const {user} = useContext(AuthContext);

  return (
    <>
      <header>
        {!user &&
          <NavbarPublic />
        }
        {user?.type === 1 &&
          < NavbarAdmin />
        }
        {user?.type === 2 &&
          < NavbarUser />
        }
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
