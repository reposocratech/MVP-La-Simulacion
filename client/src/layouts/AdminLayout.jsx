import { Outlet } from "react-router"

export const AdminLayout = () => {
  return (
    <>
      <header>
        Navbar Admin
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
