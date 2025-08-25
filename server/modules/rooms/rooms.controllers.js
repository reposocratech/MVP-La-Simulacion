import roomsDal from "./rooms.dal.js";

class RoomController {

  // Método para crear una nueva sala:
  createRoom = async(req,res)=>{
    try {
      const {room_name, room_description, who_can_use_it, pricing, usage_policy} =req.body;

      // Creamos un array para almacenar los nombres de los archivos.
      let file = [];

      if (req.files) {
        req.files.forEach(e => file.push(e.filename)); 
      }

      // reducer
      const data = {
        room_name,
        room_description,
        who_can_use_it,
        pricing,
        usage_policy,
        file
      }

      // Este await me devuelve el id del room desde el Dal y se lo mando al front en la respuesta
      const room_id = await roomsDal.createRoom(data);
      res.status(200).json({message:"inserción ok", room_id});

    } catch (error) {
      console.log(error);
      
      res.status(500).json({message:"error de server"})
    }

  }

  // Método para mostrar una única sala con sus imágenes:
  getRoomWithImagesById = async(req, res) => {
    const { id } = req.params;
    try {
      const room = await roomsDal.getRoomById(id);
      const images = await roomsDal.getRoomImagesById(id);
      res.status(200).json({room, images});

    } catch (error) {
      console.log("Error Controller RoomById", error);
      res.status(500).json({message:"error de server"})
    }
  }

  editRoom = async(req,res)=> {
    try {
      const {room_name, room_description, who_can_use_it, pricing, usage_policy} =req.body;
      const { room_id } = req.params; 

      let file = [];

      if (req.files) {
        req.files.forEach(e => file.push(e.filename)); 
      }

      // reducer
      const data = {
        room_name,
        room_description,
        who_can_use_it,
        pricing,
        usage_policy,
        file
      }

      const res = await roomsDal.editRoom(data, room_id);
      res.status(200).json({message:"inserción ok"})
    } catch (error) {
      res.status(500).json({message:"error de server"})
    }
  }

}

export default new RoomController();