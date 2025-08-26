import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import { ProfileCard } from '../../../components/Cards/UserInfo/ProfileCard'
import './profile.css'
import EditProfileForm from '../../../components/UserForms/EditProfileForm'
import ChangePasswordForm from '../../../components/UserForms/ChangePasswordForm'
import ChangeEmailForm from '../../../components/UserForms/ChangeEmailForm'

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState('none')
  const [successMessage, setSuccessMessage] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'editProfile':
        return (
          <EditProfileForm
            formRef={formRef}
            setActiveComponent={setActiveComponent}
            setSuccessMessage={setSuccessMessage}
          />
        )
      case 'changePassword':
        return (
          <ChangePasswordForm
            formRef={formRef}
            setActiveComponent={setActiveComponent}
            setSuccessMessage={setSuccessMessage}
          />
        )
      case 'changeEmail':
        return (
          <ChangeEmailForm
            formRef={formRef}
            setActiveComponent={setActiveComponent}
            setSuccessMessage={setSuccessMessage}
          />
        )
      default:
        return null
    }
  }

  return (
    <section className="profile-page-wrapper pt-3 mt-4">
      <Container fluid>
        <Row className="justify-content-center">
          <h1 className="h1-profile text-center mb-3">
            Tu Perfil{' '}
            <span className="span-profile accent-text align-middle ">P</span>
          </h1>
          <Col xs={12} lg={6} className="d-flex justify-content-center">
            <section className="profile-card-section">
              <ProfileCard setActiveComponent={setActiveComponent} />
            </section>
          </Col>
          <Col
            xs={12}
            lg={6}
            className="d-flex justify-content-center flex-column"
          >
            <div
              className="mx-auto"
              style={{ maxWidth: 'max-content', padding: '10px 20px' }}
            >
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
            </div>
            {activeComponent === 'none' ? (
              <aside className="profile-decoration-container mb-5 d-none d-lg-flex" />
            ) : (
              <section
                ref={formRef}
                className="profile-form-section mt-4 mt-lg-0 p-3  mb-5"
              >
                {renderActiveComponent()}
              </section>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Profile
