const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  service: "gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "goldwinadverts@gmail.com",
    pass: "utez ilft sujd zdap",
  },
});
