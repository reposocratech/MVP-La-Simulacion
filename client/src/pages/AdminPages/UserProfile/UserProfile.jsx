import { Col, Container, Row } from 'react-bootstrap';
import { ProfileCard } from '../../../components/Cards/UserInfoAdmin/ProfileCard';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContextProvider';
import './profile.css';

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const res = await fetchData(`/admin/userProfile/${id}`, "get", null, token);
        setUserData(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [id]);

  return (
    <section className="profile-page-wrapper">
      <Container>
        <h1 className="text-center mb-3">
          <span className='accent-text me-2'>P</span>
          Perfil de {userData?.user_name}
        </h1>
        <Row className="justify-content-between gap-4">
          <Col lg={5}>
            <ProfileCard user={userData}/>
          </Col>
          <Col lg={6}>
            <aside className="profile-decoration-container" />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default UserProfile;