import { deleteFile } from '../../helpers/fileSystem.js'
import eventsDal from './events.dal.js'

class EventController {
  getEventData = async (req, res) => {
    try {
      const result = await eventsDal.getEventData()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  // Obtener eventos de un mes concreto
  getEventsByMonth = async (req, res) => {
    try {
      const { year, month } = req.params
      const result = await eventsDal.getEventsByMonth(
        Number(year),
        Number(month)
      )
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  // Obtener eventos de un día concreto
  getEventsByDay = async (req, res) => {
    try {
      const { date } = req.params
      const result = await eventsDal.getEventsByDay(date)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  createEvent = async (req, res) => {

    try {
      //extraer datos del body con destructuring
      const {
        event_title,
        event_description,
        location,
        cover_image,
        duration,
        start_date,
        end_date,
        start_hour,
        end_hour,
        number_of_attendees,
        price,
        ticket_link,
        type_event,
        section_public,
        sections = [],
      } = req.body;

      // Manejo de imágenes
      let cover = cover_image || null;
      const sectionImgs = {};
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          if (file.fieldname === 'cover_image') {
            cover = file.filename;
          } else {
            // fieldname = "section1", "section2", etc.
            if (!sectionImgs[file.fieldname]) {
              sectionImgs[file.fieldname] = [];
            }
            sectionImgs[file.fieldname].push(file.filename);
          }
        });
      }

      // Procesar secciones (section_public + sections normales)
      const allSections = [];

      if (section_public) {
        allSections.push({
          ...section_public,
          section_id: 1,
          key_points:
            section_public.key_points?.map((kp, idx) => ({
              ...kp,
              section_key_point_id: idx + 1,
            })) || [],
        });
      }

      sections.forEach((section, idx) => {
        allSections.push({
          ...section,
          section_id: idx + 2,
          images: sectionImgs[`section${idx + 1}`] || [],
          key_points:
            section.key_points?.map((kp, kIdx) => ({
              ...kp,
              section_key_point_id: kIdx + 1,
            })) || [],
        });
      });

      // Armar objeto final
      const data = {
        event_title,
        event_description,
        location,
        cover_image: cover,
        duration,
        start_date,
        end_date,
        start_hour,
        end_hour,
        number_of_attendees,
        price,
        ticket_link,
        type_event,
        sections: allSections,
      };

      const eventId = await eventsDal.createEvent(data);
      res.status(200).json({ message: 'Inserción OK', eventId });
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  getEventById = async(req, res) => {
    try {
      const {id} = req.params;
      const event = await eventsDal.getEventById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  editDataEvent = async(req, res) => {
    try {
      const {id} = req.params;
      const result = await eventsDal.editDataEvent(req.body, req.file, id);
      if(req.file) {
        res.status(200).json({filename: req.file.filename})
      } else {
        res.status(200).json({filename: null});
      }
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  editDataSection = async(req, res) => {
    try {
      const result = await eventsDal.editDataSection(req.body);
      res.status(200).json({ message: 'Cambios realizados'});
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  delKeypoint = async (req , res) =>{
    try {
      const { key_point_id } = req.body;
      await eventsDal.delKeypoint(key_point_id)
      res.status(200).json({ message: 'Cambios realizados'});
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  deleteSection = async(req, res) => {
    try {
      const {id} = req.params;
      const files = req.body.files;
      const result = await eventsDal.deleteSection(id);
      
      for (const file of files) {
        await deleteFile(file, "events");
      }
      res.status(200).json({ message: 'Cambios realizados'});
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  addKeypoint = async (req , res) =>{
    try {
      const { section_id , keyPoint } = req.body;
      const event_id = req.params.id
      const data = {
        event_id,
        section_id,
        key_point_title: keyPoint.key_point_title,
        key_point_description : keyPoint.key_point_description
      }
      
      await eventsDal.addKeypoint(data)
      res.status(200).json({ message: 'Inserción realizada'});
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
      console.log("error server" , error);
    }
  }

    deleteSectionImage = async(req, res) => {
      try {
        const {event_id, section_id, section_image_id, file} = req.body;
        await eventsDal.deleteSectionImage(event_id, section_id, section_image_id, file);

        res.status(200).json({message: "Borrado de imagen Ok" }); 

      } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
      }
    }

    addSectionImages = async(req, res) => {
      try {
        const {event_id, section_id} = req.body;
        const result = await eventsDal.addSectionImages(event_id, section_id, req.files);
        
        res.status(200).json({message: "Imágenes añadidas Ok" }); 

      } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
      }
    }
}

export default new EventController();
