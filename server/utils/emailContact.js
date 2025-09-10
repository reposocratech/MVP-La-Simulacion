export const emailContact = ({ name, lastname, email, phone_number, consult }) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Mensaje de contacto</title>
    </head>
    <body>
      <h2 style="
          background-color: #F0B9D9;
          display: inline-block; 
          padding: 0.5rem;
          border-radius: 10px;
        "
        >¡Hola! Se ha recibido un nuevo mensaje de contacto.</h2>
      <div>
        <article>
          <div style="
              background-color: #E9F2D9;
              display: inline-block;
              padding: 1rem;
              border-radius: 10px;
            ">
            <h4><strong>Nombre</strong> ${name} ${lastname ? lastname : ""}</h4>
            <h4><strong>Email:</strong> ${email}</h4>
            <p><strong>Teléfono:</strong> ${phone_number}</p>
            <p><strong>Consulta:</strong> ${consult}</p>
          </div>
        </article>
      </div>
    </body>
    </html>
  `;
}
