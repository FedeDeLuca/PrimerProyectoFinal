"use strict"
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
router.get("/", (req, res) => {
  res.render("index")
});

const validationRules = [
  body("name", "Debe ingresar su nombre").exists().isLength({ min: 2 }),
  body("lastName", "Debe ingresar su apellido").exists().isLength({ min: 2 }),
  body("email", "Debe ingresar un email válido").exists().isEmail(),
  body("message", "Su mensaje debe contener entre 10 y 300 caracteres")
    .exists()
    .isLength({ min: 10, max: 300 }),
];

// NODEMAILER
router.post("/", validationRules, async (req,res) =>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formData = req.body;
      const arrWarnings = errors.array();
      res.render("contact", { formData, arrWarnings });
    } else {
  
  const emailMsg = {
    to: "atencioncliente@empresa.com",
    from: req.body.email,
    subjet: "Mensaje enviado desde formulario de contacto",
    html: `${req.body.name} ${req.body.lastName} envió el siguiente mensaje: ${req.body.message}`
  };
  
  const transport = nodemailer.createTransport({
    host: process.env.ES_HOST,
    port: process.env.ES_PORT,
    auth: {
      user: process.env.ES_USER,
      pass: process.env.ES_PASS
    }
  });
  
  const sendMailStatus = await transport.sendMail(emailMsg);
  let sendMessage = "";
  if (sendMailStatus.rejected.length) {
    sendMessage = "No pudimos enviar su mensaje, intente nuevamente";
  } else {
    sendMessage = "Mensaje enviado";
  }
  res.render("contact", { sendMessage });
}
}
);
  module.exports = router;