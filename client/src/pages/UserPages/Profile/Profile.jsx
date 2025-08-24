import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContextProvider'
import { ProfileCard } from '../../../components/Cards/UserInfo/ProfileCard'
import './profile.css'

const Profile = () => {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <p className="lead">Cargando datos del usuario...</p>
  }

  return (
    <main className="profile-page-wrapper pt-5 mt-4">
      <Container fluid>
        <Row className="justify-content-center">
          <h1 className="h1-profile text-center my-3">
            Tu Perfil{' '}
            <span className="span-profile accent-text align-middle">P</span>
          </h1>
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <section className="profile-card-section">
              <ProfileCard />
            </section>
          </Col>
          <Col
            xs={12}
            lg={6}
            className="d-none d-lg-flex justify-content-center"
          >
            <aside className="profile-decoration-container mb-2" />
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Profile
