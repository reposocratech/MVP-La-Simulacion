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
}

export default new AdminController();