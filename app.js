"use strict"
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = 3000;
const session = require("express-session");
require("dotenv").config();
const app = express();
//enrutador
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeProducts = require("./routes/products");
const routeContact = require("./routes/contact");
const routeCatalogo = require("./routes/catalogo");
const routeaddItem = require("./routes/addItem");




app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: false}));

hbs.registerPartials(path.join(__dirname, "./views/partials"));
//uso de sesiones 
app.use(
  session({
    secret: "clave segura atroden",
    resave: false,
    saveUninitialized: true,
  }));

//middleware
const secured = async (req, res, next) => {
  if(req.session.user) {
    app.locals.user = req.session.user;
    next();
  } else {
    res.render("login");
  }
};

const isAuth = (req, res, next) => {
  app.locals.user = req.session.user;
  next();
};

//motor de plantillas
app.set("view engine" , "hbs");
app.set("views", path.join(__dirname, "views"));

//uso de rutas 
app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/contact", routeContact);
app.use("/products", secured, routeProducts);
app.use("/catalogo", secured, routeCatalogo);
app.use("/addItem", secured, routeaddItem);



//app en localhost
app.listen(PORT, (err) => {
  err ? 
    console.log("Ocurrio un error") :
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});


// Email sender

