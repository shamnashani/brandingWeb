const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to) return // no notification email configured — skip silently
    await resend.emails.send({
      from: "StudioBits Tech <onboarding@resend.dev>",
      to,
      subject,
      html,
    })
  } catch (err) {
    console.error("Email send failed:", err.message)
    // don't throw — a failed email shouldn't break the enquiry save
  }
}

module.exports = sendEmail