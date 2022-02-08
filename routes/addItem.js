"use strict"
const express = require("express");
const router = express.Router();
const productModels = require("../models/productModels");

router.get("/", (req, res) => {
  res.render("addItem");
});

router.post("/", (req, res) => {
  productModels.addProduct({...req.body});
  res.redirect("/catalogo");
});

module.exports = router;