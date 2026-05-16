import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.STMP_USER,
    pass: process.env.STMP_PASS,
  },
});

export default transporter