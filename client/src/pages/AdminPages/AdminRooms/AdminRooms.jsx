import { Container } from 'react-bootstrap';
import './adminRooms.css';
import { CustomTable } from '../../../components/Table/CustomTable';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';

const AdminRooms = () => {
  const { token } = useContext(AuthContext);

  const [roomsData, setRoomsData] = useState([]);

  useEffect(() => {
    const fetchRooms = async() => {
      try {
        const res = await fetchData("/admin/rooms", "get", null, token);
        setRoomsData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRooms();
  }, []);

  const cutText = (text, maxWords) => {
    if (text) {
      const words = text.split(' ');
      return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
    }
  }

  const columns = [
    {key: "room_name", label: "Sala"},
    {
      key: "room_description",
      label: "Descripción",
      render: (row) => cutText(row.room_description, 20)
    },
    {
      key: "pricing", 
      label: "Precios",
      render: (row) => cutText(row.pricing, 15)
    },
    {
      key: "actions", 
      label: "Acciones",
      render: (row) => (
        <button
          className="btn-table block"
        >Eliminar</button>
      )
    }
  ];

  return (
    <section className='section-admin-rooms'>
      <Container>
        <h1><span>S</span>Gestión de salas</h1>

        <CustomTable
          columns={columns}
          data={roomsData}
        />
      </Container>
    </section>
  )
}

export default AdminRooms;