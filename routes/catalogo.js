"use strict"
const express = require("express");
const router = express.Router();
const productModels = require("../models/productModels");
router.get("/", async (req, res) => {
  const data = await productModels.getProducts();
  res.render("catalogo", {data});
});

module.exports = router; 