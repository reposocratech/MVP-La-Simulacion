import React from 'react'
import { Outlet } from 'react-router'
import { NavbarUser } from '../components/navbars/NavbarUser/NavbarUser'
import { Footer } from '../components/Footer/Footer'

export const UserLayout = () => {
  return (
    <>
      <header>
        <NavbarUser />
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
