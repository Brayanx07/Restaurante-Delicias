const enviarConfirmacion = async (reserva) => {
  const urlEditar = `${process.env.FRONTEND_PUBLIC_URL}/editar-reserva/${reserva.id}`

  const fecha = new Date(reserva.fecha).toLocaleDateString('es-HN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #111; color: white; padding: 40px; max-width: 600px; margin: 0 auto; border-radius: 16px;">
      <h1 style="color: #ffb703; margin-bottom: 8px;">Restaurante Delicias</h1>
      <p style="color: #aaa; margin-bottom: 30px;">Tu reserva fue recibida exitosamente 🎉</p>

      <div style="background-color: #1a1a1a; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="color: #ffb703; margin-bottom: 16px; font-size: 18px;">Detalles de tu reserva</h2>
        <p><strong>Nombre:</strong> ${reserva.nombre}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${reserva.hora?.slice(0, 5)}</p>
        <p><strong>Personas:</strong> ${reserva.personas}</p>
        ${reserva.mensaje ? `<p><strong>Mensaje:</strong> ${reserva.mensaje}</p>` : ''}
      </div>

      <p style="color: #aaa; margin-bottom: 20px;">
        ¿Necesitás cambiar la fecha, hora o número de personas? Podés modificar tu reserva desde el siguiente enlace:
      </p>

      <a href="${urlEditar}" style="display: inline-block; padding: 14px 28px; background-color: #ffb703; color: #111; font-weight: bold; text-decoration: none; border-radius: 30px; font-size: 15px;">
        Modificar mi reserva
      </a>

      <p style="color: #555; font-size: 12px; margin-top: 30px;">
        Si no realizaste esta reserva, podés ignorar este mensaje.<br/>
        Restaurante Delicias — Col. Palmira, Tegucigalpa, Honduras
      </p>
    </div>
  `

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      sender:      { name: 'Restaurante Delicias', email: process.env.BREVO_SENDER_EMAIL },
      to:          [{ email: reserva.email, name: reserva.nombre }],
      subject:     '✅ Reserva recibida — Restaurante Delicias',
      htmlContent: html
    })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Brevo error: ${JSON.stringify(err)}`)
  }
}

module.exports = { enviarConfirmacion }
