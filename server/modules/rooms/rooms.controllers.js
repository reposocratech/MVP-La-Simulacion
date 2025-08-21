import roomsDal from "./rooms.dal.js";

class RoomController {
  createRoom = async(req,res)=>{
    try {
      const {room_name, room_description, who_can_use_it, pricing, usage_policy} = JSON.parse(req.body.data);

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

      const result = await roomsDal.createRoom(data);
      res.status(200).json({message:"inserción ok", result})
    } catch (error) {
      console.log(error);
      
      res.status(500).json({message:"error de server"})
    }

  }

  showOneRoom = () => {
    res.status(200).json("Hola, soy una room");
  }
}

export default new RoomController();