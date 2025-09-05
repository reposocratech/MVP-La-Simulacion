import { hashPassword } from "../../helpers/hashUtils.js";
import adminDal from "./admin.dal.js";

class AdminController {
  getUsersData = async(req, res) => {
    try {
      const result = await adminDal.getUsersData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  //método para habilitar o deshabilitar usuarios desde tabla
  enableDisableUser = async(req, res) => {
    try {
      const { id, user_is_disabled } = req.body;
      await adminDal.enableDisableUser(id, user_is_disabled);
      res.status(200).json({message: "Cambio realizado"});
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getUserById = async(req, res) => {
    try {
      const { id } = req.params;
      const result = await adminDal.getUserById(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getAdminsData = async(req, res) => {
    try {
      const result = await adminDal.getAdminsData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  registerAdmin = async(req, res) => {
    try {
      const { user_name, email, password } = req.body;

      //Verificacion de que el email no este registrado
      const result = await adminDal.findUserEmail(email);
      if (result.length !== 0) {
        throw {
          isLogged: true,
          message: "Este usuario ya existe"
        }
      }

      //encriptar la contraseña
      const hashedPassword = await hashPassword(password);
      const data = [user_name, email, hashedPassword, 1, 1];
      const insertResult = await adminDal.registerAdmin(data);
      
      const newInsert = {
        user_id: insertResult.insertId,
        user_name,
        email
      };
      res.status(200).json(newInsert);
    } catch (error) {
      if(error.isLogged){
        res.status(401).json(error.message);
      }else{
        res.status(500).json({message: "Error de servidor"});
      }
    }
  }

  //método para deshabilitar un admin
  removeAdmin = async(req, res) => {
    try {
      const { id } = req.body;
      if (id !== 1){
        await adminDal.removeAdmin(id);
        res.status(200).json({message: "Cambio realizado"});
      } else {
        res.status(403).json({message: "No se puede deshabilitar al superadmin"});
      }
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getEventsData = async(req, res) => {
    try {
      const result = await adminDal.getEventsData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  deleteEvent = async(req, res) => {
    try {
      const { id } = req.body;
      await adminDal.deleteEvent(id);
      res.status(200).json({message: "Cambio realizado"});
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getRoomsData = async(req, res) => {
    try {
      const result = await adminDal.getRoomsData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getReservationsData = async(req, res) => {
    try {
      const result = await adminDal.getReservationsData();
      res.status(200).json(result);
      } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }
      
  deleteRoom = async(req, res) => {
    try {
      const { id } = req.body;
      await adminDal.deleteRoom(id);
      res.status(200).json({message: "Cambio realizado"});
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  changeStatusReservation = async(req, res) => {
    try {
      const {id, status} = req.body;
      await adminDal.changeStatusReservation(id, status);

      res.status(200).json({message: "Cambio de estado realizado"});

    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }

  getReservationById = async(req, res) => {
    try {
      const {id} = req.params;

      const result = await adminDal.getReservationById(id);
      console.log("RESULLLRRLRLRLRLRL", result);
      res.status(200).json(result);
      

    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  } 

}

export default new AdminController();