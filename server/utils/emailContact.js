const emailContact = ({ name, lastname, email, phone_number, consult }) => {
  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${name} ${lastname}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${phone_number}</p>
    <p><strong>Consulta:</strong> ${consult}</p>
  `;
  return html;
}

export default emailContact;