export const generateReservationEmailHTML = (data) => {
  const {
    room_name,
    user_name,
    lastname,
    email,
    phone_number,
    date,
    start_hour,
    end_hour,
    proyect_description,
    proyect_type,
    socialmedia_link,
    ilumination_material,
    number_of_attendees,
    aditional_requirement,
  } = data;

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Solicitud de reserva: La Simulación</title>
    </head>
    <body>
      <h2 style="
          background-color: #F0B9D9;
          display: inline-block; 
          padding: 0.5rem;
          border-radius: 10px;
        "
        >¡Hola! Se ha recibido una nueva solicitud de reserva.</h2>
     
      <div>
        <h3 style="
            background-color: #B4D380;
            display: inline-block;
            padding: 0.5rem;
            border-radius: 10px;
          "
          >Estos son los datos enviados por el usuario:</h3>
      </div>
      <div>
        <article>
          <div style="
              background-color: #E9F2D9;
              display: inline-block;
              padding: 1rem;
              border-radius: 10px;
            ">
            <h4><strong>Sala:</strong> ${room_name}</h4>
            <h4><strong>Usuario:</strong> ${user_name} ${lastname ? lastname : ""}</h4>
            <h4><strong>Email:</strong> ${email}</h4>
            <hr>
            <p><strong>Teléfono:</strong> ${phone_number}</p>
            <p><strong>Fecha:</strong> ${date}</p>
            <p><strong>Hora de inicio:</strong> ${start_hour}</p>
            <p><strong>Hora de fin:</strong> ${end_hour}</p>
            <p><strong>Descripción del proyecto/trayectoria:</strong> ${proyect_description}</p>
            <p><strong>Tipo de proyecto:</strong> ${proyect_type}</p>
            <p><strong>Enlace redes sociales:</strong> ${
              socialmedia_link || 'No proporcionado'
            }</p>
            <p><strong>¿Necesita material de iluminación?</strong> ${
              ilumination_material === '1' ? 'Sí' : 'No'
            }</p>
            <p><strong>Núm. de personas presentes:</strong> ${number_of_attendees}</p>
            <p><strong>¿Tiene requerimientos técnicos adicionales?</strong> ${
              aditional_requirement || 'No especificado'
            }</p>
          </div>
        </article>

      </div>
      <div style="
              padding-top: 0.5rem;
            ">
        <a
          href="${process.env.FRONTEND_URL}admin/reservations"
          style="
            display: inline-block;
            background-color: #F0B9D9;
            color: black;
            border: none;
            border-radius: 12px;
            padding: .6rem 1.5rem;
            text-decoration: none;
          "
          target="_blank"
        >
          <strong>Ir al panel de gestión de reservas</strong>
        </a>
      </div>
    </body>
    </html>
  `;
};
