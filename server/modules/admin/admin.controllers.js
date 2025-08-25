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
}

export default new AdminController();