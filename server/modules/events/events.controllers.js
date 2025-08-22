import eventsDal from "./events.dal.js";

class EventController {
  getEventData = async(req, res) => {
    try {
      const result = await eventsDal.getEventData();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: "Error de servidor"});
    }
  }
}

export default new EventController();