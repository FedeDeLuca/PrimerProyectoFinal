"use strict"
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const router = express.Router();
const productModels = require("../models/productModels");
router.get("/", async (req, res) => {
  const products = await productModels.getProducts();
  const data = products.map((row) => {
    const imageURL = cloudinary.url(row.image, {
      width: 100,
      height: 100,
      crop: "fill"
    });
    return {...row, imageURL};
  });
  res.render("catalogo", {data});
});

module.exports = router; 