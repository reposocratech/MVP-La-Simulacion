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
      } = JSON.parse(req.body.dataTotal)

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
      console.log(error)
      res.status(500).json({ message: 'Error de servidor' });
    }
  }

  getEventById = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await eventsDal.getEventById(id);
      console.log("result de controllerrrrr", result);
      let data = {
        event_id: result[0].event_id,
        event_title: result[0].event_title,
        event_description: result[0].event_description,
        location: result[0].location,
        cover_image: result[0].cover_image,
        duration: result[0].duration,
        start_date: result[0].start_date,
        end_date: result[0].end_date,
        start_hour: result[0].start_hour,
        end_hour: result[0].end_hour,
        number_of_attendees: result[0].number_of_attendees,
        ticket_link: result[0].ticket_link,
        type_event: result[0].type_event,
        sections: []
      }

      result.forEach(elem => {
        if (!elem.section_id) return; // si no hay sección, saltamos

        // buscamos si la sección ya existe en data.sections
        let section = data.sections.find(s => s.section_id === elem.section_id);

        if (!section) {
          // si no existe, la creamos
          section = {
            section_id: elem.section_id,
            section_title: elem.section_title,
            section_subtitle: elem.section_subtitle,
            section_description: elem.section_description,
            section_duration: elem.section_duration,
            event_id: elem.event_id,
            section_images: [],
            section_key_points: []
          };
          data.sections.push(section);
        }

        // si hay imagen, la añadimos a la sección existente
        if (elem.section_image_id) {
          section.section_images.push({
            event_id: elem.event_id,
            section_id: elem.section_id,
            section_image_id: elem.section_image_id,
            file: elem.file
          });
        }

        // si hay key_point, lo añadimos también
        if (elem.section_key_point_id) {
          section.section_key_points.push({
            event_id: elem.event_id,
            section_id: elem.section_id,
            section_key_point_id: elem.section_key_point_id,
            key_point_title: elem.key_point_title,
            key_point_description: elem.key_point_description
          });
        }
      });
      console.log("dataaaaaaaaaaaaaaaa", data);
      res.status(200).json(data);

    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' });
    }
  }
}

export default new EventController()
