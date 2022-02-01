"use strict"
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
router.get("/", (req, res) => {
  res.render("index")
});

// NODEMAILER
router.post("/", (req,res) =>{
  const emailMsg = {
    to: "atencioncliente@empresa.com",
    from: req.body.email,
    subjet: "Mensaje enviado desde formulario de contacto",
    html: `${req.body.name} ${req.body.lastName} envió el siguiente mensaje: ${req.body.message}`
  };
  
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "44077177ae4f89",
      pass: "159ee30771106a"
    }
  });
  
  transport.sendMail(emailMsg);
  res.render("contact", {
    message: "mensaje enviado"
  })
});
  module.exports = router;