import { Container } from 'react-bootstrap';
import './adminRooms.css';
import { CustomTable } from '../../../components/Table/CustomTable';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate } from 'react-router';

const AdminRooms = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const deleteRoom = async(id) => {
    try {
      const values = { id };
      const res = await fetchData("/admin/deleteRoom", "put", values, token);
      setRoomsData(roomsData.filter(e => e.room_id !== id));
    } catch (error) {
      console.log(error);
    }
  }

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
      render: (row) => cutText(row.room_description, 15)
    },
    {
      key: "pricing", 
      label: "Precios",
      render: (row) => cutText(row.pricing, 10)
    },
    {
      key: "edit", 
      label: "Editar",
      render: (row) => (
        <button
          className="btn-table edit"
          onClick={() => navigate(`/admin/editRoom/${row.room_id}`)}
        >Editar</button>
      )
    },
    {
      key: "delete", 
      label: "Borrar",
      render: (row) => (
        <button
          className="btn-table block"
          onClick={() => deleteRoom(row.room_id)}
        >Borrar</button>
      )
    }
  ];

  return (
    <section className='section-admin-rooms'>
      <Container>
        <h1><span>S</span>Gestión de salas</h1>
        <div className="text-center">
          <button 
            className="create-button"
            onClick={() => navigate('/admin/createRoom')}
          >Crear sala</button>
        </div>

        <CustomTable
          columns={columns}
          data={roomsData}
        />
      </Container>
    </section>
  )
}

export default AdminRooms;