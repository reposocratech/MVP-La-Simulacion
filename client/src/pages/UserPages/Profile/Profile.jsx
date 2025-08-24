import { useContext, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContextProvider'
import { ProfileCard } from '../../../components/Cards/UserInfo/ProfileCard'
import './profile.css'
import EditProfileForm from '../../../components/UserForms/EditProfileForm'
import ChangePasswordForm from '../../../components/UserForms/ChangePasswordForm'
import ChangeEmailForm from '../../../components/UserForms/ChangeEmailForm'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [activeComponent, setActiveComponent] = useState('none')

  if (!user) {
    return <p className="lead">Cargando datos del usuario...</p>
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'editProfile':
        return <EditProfileForm setActiveComponent={setActiveComponent} />
      case 'changePassword':
        return <ChangePasswordForm setActiveComponent={setActiveComponent} />
      case 'changeEmail':
        return <ChangeEmailForm setActiveComponent={setActiveComponent} />
      default:
        return null
    }
  }

  return (
    <main className="profile-page-wrapper pt-5 mt-4">
      <Container fluid>
        <Row className="justify-content-center">
          <h1 className="h1-profile text-center my-3 mb-4">
            Tu Perfil{' '}
            <span className="span-profile accent-text align-middle">P</span>
          </h1>
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <section className="profile-card-section">
              <ProfileCard setActiveComponent={setActiveComponent} />
            </section>
          </Col>
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            {activeComponent === 'none' ? (
              <aside className="profile-decoration-container mb-2 d-none d-lg-flex" />
            ) : (
              <section className="profile-form-section mt-4 mt-lg-0">
                {renderActiveComponent()}
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Profile
