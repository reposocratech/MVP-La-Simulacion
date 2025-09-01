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

  // Crear nuevo evento o taller
  // createEvent = async(req, res) => {
  //   try {
  //     console.log("REQQQQ FILES", req.files);
  //     console.log("REQQQQ BODY", req.body.dataTotal);
  //     const dataTotal = JSON.parse(req.body.dataTotal);

  //     const { event_title, event_description, location, cover_image, duration, start_date, end_date, start_hour, end_hour, number_of_attendees, price, ticket_link, type_event, sections} = dataTotal;

  //     let parsedSections = [];

  //     if (dataTotal.sections){
  //       dataTotal.sections.forEach((sect)=>{

  //         // let key_points = [];

  //         // if (req.body.dataTotal.sections.key_points){
  //         //   req.body.dataTotal.sections.key_points.forEeach((kPoint)=>{
  //         //     key_points.push(kPoint);
  //         //   })
  //         // }
  //         parsedSections.push(sect);

  //       });
  //     }
  //     console.log("SECTIONSSS", sections);
  //     console.log("SECTIONSSS", key_points);

  //     //const result = await eventsDal.createEvent();
  //     res.status(200).json("Evento Creado OK");
  //   } catch (error) {
  //     res.status(500).json({message: "Error de servidor", error});
  //   }
  // }

  createEvent = async (req, res) => {
    try {
      // :uno: Extraer datos del body con destructuring
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

      // :dos: Manejo de imágenes
      let cover = cover_image || null
      const sectionImgs = {}
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          if (file.fieldname === 'cover_image') {
            cover = file.filename
          } else {
            // fieldname = "section1", "section2", etc.
            if (!sectionImgs[file.fieldname]) {
              sectionImgs[file.fieldname] = []
            }
            sectionImgs[file.fieldname].push(file.filename)
          }
        })
      }
      // :tres: Procesar secciones (section_public + sections normales)
      const allSections = []
      if (section_public) {
        allSections.push({
          ...section_public,
          section_id: 1,
          key_points:
            section_public.key_points?.map((kp, idx) => ({
              ...kp,
              section_key_point_id: idx + 1,
            })) || [],
        })
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
        })
      })
      // :cuatro: Armar objeto final
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
      }

      // :cinco: Insertar en la BD usando DAL
      const result = await eventsDal.createEvent(data)
      res.status(200).json({ message: 'Inserción OK', result })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error de servidor' })
    }
  }

  getEventById = async (req, res) => {
    try {
      const { id } = req.params
      const result = await eventsDal.getEventById(id)
      if (!result) {
        return res.status(404).json({ message: 'Evento no encontrado' })
      }
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error de servidor' })
    }
  }
}

export default new EventController()
