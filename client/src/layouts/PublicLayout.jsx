import { Outlet } from "react-router"

export const PublicLayout = () => {
  return (
    <>
      <header>
        Navbar
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
