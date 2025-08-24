const emailVerify = (redirect) => {
  return `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Email verificado</title>
    </head>
    <body>
      <h2>Email verificado correctamente. Redirigiendo al login...</h2>
      <script>
        setTimeout(function() {
          window.location.href = "${redirect}";
        }, 3000);
      </script>
    </body>
  </html>
  `;
};

export default emailVerify;
