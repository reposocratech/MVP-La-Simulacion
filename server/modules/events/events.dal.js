import executeQuery, { dbPool } from '../../config/db.js'
import { cleanInputs } from '../../utils/cleanInputs.js'
import { deleteFile } from '../../helpers/fileSystem.js'

class EventDal {
  //traer todos los eventos que no estén borrados
  getEventData = async () => {
    try {
      let sql = " SELECT event_id, event_title, event_description, location, cover_image, start_date, end_date FROM event WHERE EVENT_IS_DELETED = 0 "
      let result = await executeQuery(sql)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }

  getEventsByMonth = async (year, month) => {
    try {
      const monthStr = String(month).padStart(2, '0')
      const firstDay = `${year}-${monthStr}-01`
      const sql = `SELECT event_id, event_title, event_description, location, cover_image,
                        start_date, end_date, start_hour, end_hour, price, ticket_link
                 FROM event
                 WHERE event_is_deleted = 0
                   AND ((start_date BETWEEN ? AND LAST_DAY(?))
                        OR (end_date BETWEEN ? AND LAST_DAY(?)))`
      const params = [firstDay, firstDay, firstDay, firstDay]
      const result = await executeQuery(sql, params)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }

  getEventsByDay = async (date) => {
    try {
      const sql = `SELECT event_id, event_title, event_description, location, cover_image,
                        start_date, end_date, start_hour, end_hour, price, ticket_link
                 FROM event
                 WHERE event_is_deleted = 0
                   AND start_date <= ?
                   AND (end_date IS NULL OR end_date >= ?)`
      const params = [date, date]
      const result = await executeQuery(sql, params)
      return result
    } catch (error) {
      throw { message: 'Error en bd' }
    }
  }

  createEvent = async (data) => {
    
    const cleanedData = cleanInputs(data);

    const {
      event_title,
      event_description,
      location,
      duration,
      start_date,
      end_date,
      start_hour,
      end_hour,
      number_of_attendees,
      price,
      ticket_link,
      type_event,
      cover_image,
      sections,
    } = cleanedData; 


    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      let sql =
        'INSERT INTO event (event_title, event_description, location, duration, start_date, end_date, start_hour, end_hour, number_of_attendees, price, ticket_link, type_event) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

      let values = [
        event_title,
        event_description,
        location,
        duration,
        start_date,
        end_date,
        start_hour,
        end_hour,
        number_of_attendees,
        price,
        ticket_link,
        type_event,
      ];

      if (cover_image) {
        sql = 'INSERT INTO event (event_title, event_description, location, duration, start_date, end_date, start_hour, end_hour, number_of_attendees, price, ticket_link, type_event, cover_image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

        values = [
          event_title,
          event_description,
          location,
          duration,
          start_date,
          end_date,
          start_hour,
          end_hour,
          number_of_attendees,
          price,
          ticket_link,
          type_event,
          cover_image,
        ];
      }

      let resultEvent = await connection.query(sql, values);
      let event_id = resultEvent[0].insertId;

      if (sections) {
        for (const sect of sections) {
          const {
            section_id,
            section_title,
            section_subtitle,
            section_description,
            section_duration,
            key_points,
            images,
          } = sect;

          let sqlSections = 'INSERT INTO section (section_id, section_title, section_subtitle, section_description, section_duration, event_id) VALUES (?,?,?,?,?,?)';

          let valuesSections = [
            section_id,
            section_title,
            section_subtitle,
            section_description,
            section_duration,
            event_id,
          ];

          await connection.query(sqlSections, valuesSections);

          if (key_points) {
            for (const point of key_points) {
              const {
                key_point_title,
                key_point_description,
                section_key_point_id,
              } = point;

              let sqlKeyPoint = 'INSERT INTO section_key_point (key_point_title, key_point_description, section_key_point_id, section_id, event_id) VALUES (?,?,?,?,?)';

              let valuesKeyPoint = [
                key_point_title,
                key_point_description,
                section_key_point_id,
                section_id,
                event_id,
              ];

              let res = await connection.query(sqlKeyPoint, valuesKeyPoint);
              //console.log("RESSSSS", res);
            }
          }

          if (images && images.length > 0) {
            let imgId = 0;
            for (const img of images) {
              imgId++;

              let sqlImg = 'INSERT INTO section_image (event_id, section_id, section_image_id, file) VALUES (?,?,?,?)';
              let valuesImg = [event_id, section_id, imgId, img];

              let resImg = await connection.query(sqlImg, valuesImg);
              //console.log('RES IMG', resImg);
            }
          }
        }
      }

      await connection.commit();
      return event_id;
    } catch (error) {
      console.log("error del dal", error)
      await connection.rollback();
      throw { message: 'Error en base de datos' };
    } finally {
      connection.release();
    }
  }

  /* getEventById = async (id) => {
    // try {
    //   const sqlEvent = `
    //   SELECT event_id, event_title, event_description, location, cover_image,
    //          duration, start_date, end_date, start_hour, end_hour,
    //          number_of_attendees, price, ticket_link
    //   FROM event
    //   WHERE event_is_deleted = 0 AND event_id = ?
    // `
    //   const eventResult = await executeQuery(sqlEvent, [id])
    //   if (eventResult.length === 0) return null
    //   const event = eventResult[0]

    //   const sections = await executeQuery(
    //     'SELECT section_id, section_title, section_subtitle, section_description, section_duration FROM section WHERE event_id = ? ORDER BY section_id',
    //     [id]
    //   )

    //   const images = await executeQuery(
    //     'SELECT section_id, section_image_id, file FROM section_image WHERE event_id = ? AND section_image_is_deleted = 0 ORDER BY section_image_id',
    //     [id]
    //   )

    //   const keyPoints = await executeQuery(
    //     'SELECT section_id, section_key_point_id, key_point_title, key_point_description FROM section_key_point WHERE event_id = ?',
    //     [id]
    //   )

    //   const enrichedSections = sections.map((sec) => {
    //     sec.images = images
    //       .filter((img) => img.section_id === sec.section_id)
    //       .map((img) => img.file)
    //     sec.key_points = keyPoints.filter(
    //       (kp) => kp.section_id === sec.section_id
    //     )
    //     return sec
    //   })

    //   return { event, sections: enrichedSections }
    // } catch (error) {
    //   throw { message: 'Error en base de datos' }
    // }

    try {
      let sql = "SELECT event.*, section.*, section_image.*, section_key_point.* FROM event LEFT JOIN section ON event.event_id = section.event_id LEFT JOIN section_image ON section.event_id = section_image.event_id AND section.section_id = section_image.section_id LEFT JOIN section_key_point ON section.event_id = section_key_point.event_id AND section.section_id = section_key_point.section_id WHERE event.event_id = ? AND event.event_is_deleted = 0";

      let result = await executeQuery(sql, [id]);
      return result;

    } catch (error) {
      throw { message: 'Error en base de datos' }
    }
  } */


  getEventById = async (id) => {
    try {
      const sqlEvent = `
      SELECT event_id, event_title, event_description, location, cover_image,
              duration, start_date, end_date, start_hour, end_hour,
              number_of_attendees, price, ticket_link, type_event
      FROM event
      WHERE event_is_deleted = 0 AND event_id = ? `;

      const eventResult = await executeQuery(sqlEvent, [id]);
      if (eventResult.length === 0) return null;
      const event = eventResult[0];

      const sections = await executeQuery(
        'SELECT section_id, section_title, section_subtitle, section_description, section_duration FROM section WHERE event_id = ? ORDER BY section_id ASC',
        [id]
      );

      for (let section of sections){
        const images = await executeQuery(
          'SELECT section_id, section_image_id, file FROM section_image WHERE event_id = ? AND section_id = ? AND section_image_is_deleted = 0 ORDER BY section_image_id ASC',
          [id, section.section_id]
        );

        section.images = images;
      }

      for (let section of sections){
        const keyPoints = await executeQuery(
          'SELECT section_id, section_key_point_id, key_point_title, key_point_description FROM section_key_point WHERE event_id = ? AND section_id = ? ORDER BY section_key_point_id ASC',
          [id, section.section_id]
        );

        section.keyPoints = keyPoints;
      }

      event.sections = sections;
      return event;
    } catch (error) {
      console.log(error);
      throw { message: 'Error en base de datos' }
    }
  }

  editDataEvent = async(data, file, id) => {
    const {type_event, event_title, event_description, location, duration, start_date, end_date, start_hour, end_hour, number_of_attendees,price, ticket_link} = JSON.parse(data.data);
    try {
      let sql = 'UPDATE event SET type_event = ?, event_title = ?, event_description = ?, location = ?, duration = ?, start_date = ?, end_date = ?, start_hour = ?, end_hour = ?, number_of_attendees = ?, price = ?, ticket_link = ? WHERE event_id = ?';
      let values = [type_event, event_title, event_description, location, duration, start_date,  end_date, start_hour, end_hour, number_of_attendees, price, ticket_link, id];
        
      if (file) {
        sql = 'UPDATE event SET type_event = ?, event_title = ?, event_description = ?, location = ?, duration = ?, start_date = ?, end_date = ?, start_hour = ?, end_hour = ?, number_of_attendees = ?, price = ?, ticket_link = ?, cover_image = ? WHERE event_id = ?'
        values = [type_event, event_title, event_description, location, duration, start_date,  end_date, start_hour, end_hour, number_of_attendees, price, ticket_link, file.filename, id];
      }

      let result = await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw { message: 'Error en base de datos' }
    }
  }

  editDataSection = async(data) => {
    try {
      const {section_id, section_title, section_subtitle, section_description, section_duration} = data.section;
      const {event_id} = data;
      let sql = 'UPDATE section SET section_title = ?, section_subtitle = ?, section_description = ?, section_duration = ? WHERE section_id = ? AND event_id = ?';
      let values = [section_title, section_subtitle, section_description, section_duration, section_id, event_id];
      let result = await executeQuery(sql, values);
    } catch (error) {
      console.log(error);
      throw { message: 'Error en base de datos' }
    }
  }

  deleteSectionImage = async(event_id, section_id, section_image_id, file) => {

    console.log("cositas", event_id, section_id, section_image_id, file);

    try {
      let sql = "DELETE FROM section_image WHERE section_image_id = ? AND section_id = ? AND event_id = ?";
      let values = [section_image_id, section_id, event_id];

      let result = await executeQuery(sql, values);
      console.log ("RESULLLLTTT OJUUUU", result);
      await deleteFile(file, "events");
     } catch (error) {
      console.log(error);
      throw { message: 'Error en base de datos' }
    }
  }

  deleteSection = async(id) => {
    try {
      let sql = 'DELETE FROM section WHERE section_id = ?';
      const result = await executeQuery(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
      throw { message: 'Error en base de datos' }
    }
  }

  addSectionImages = async(event_id, section_id, imgs) => {
    const connection = await dbPool.getConnection();

    try {
      await connection.beginTransaction();

      // Obtengo el id más alto ya que no hay autoincrement:
        let sqlId = "SELECT IFNULL(MAX(section_image_id), 0) AS max_id FROM section_image WHERE event_id = ? AND section_id = ?";
        let [result] = await connection.query(sqlId, [event_id, section_id]);
        let maxId = result[0].max_id;

        imgs.forEach(async(elem)=>{
          // Por cada imagen incremento el id
          maxId++;
          let sqlImg = 'INSERT INTO section_image (event_id, section_id, section_image_id, file) VALUES (?,?,?,?)'
          let values = [event_id, section_id, maxId, elem.filename]

          await connection.query(sqlImg, values);  
        })

        await connection.commit();
      
    } catch (error) {
      await connection.rollback();
      throw error;

    } finally {
      connection.release();
    }
  }

}

export default new EventDal();
