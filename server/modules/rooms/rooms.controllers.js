import roomsDal from "./rooms.dal.js";

class RoomController {

  // Método para crear una nueva sala:
  createRoom = async(req,res)=>{
    try {
      const {room_name, room_description, who_can_use_it, pricing, usage_policy} = req.body;

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

  // Método para editar la información de una sala existente:
  editRoom = async(req,res)=> {
    try {
      const {room_id, room_name, room_description, who_can_use_it, pricing, usage_policy} = req.body; 
      
      await roomsDal.editRoom(req.body);
      res.status(200).json({message:"inserción ok"})
    } catch (error) {
      res.status(500).json({message:"error de server"})
    }
  }

  // Método para obtener todas las imágenes de una sala específica:
  imagesByRoomId = async(req,res)=> {
    try {
      const {id} = req.params;
      
      const result = await roomsDal.imagesByRoomId(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "error de server"});
    }
  }

   // Método para borrar una sala:
  deleteImg = async(req,res)=> {
    const {id, room_image_id, file} = req.body;
    
    try {
      await roomsDal.deleteImg(id, room_image_id, file);
      res.status(200).json({message: "delete ok"});
    } catch (error) {
      res.status(500).json({message: "error de server"});
    }
  }

  // Método para añadir nuevas imágenes a una sala:
  addImages = async(req,res)=> {
    
    const { id } = JSON.parse(req.body.room_id);
    const room_id = id;

    try {
      const result = await roomsDal.addImages(room_id, req.files);
      res.status(200).json({message:"inserción ok"});
    } catch (error) {
      res.status(500).json({message: "error de server"});
    }
  }

}

export default new RoomController();