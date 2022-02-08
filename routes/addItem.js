"use strict"
const express = require("express");
const cloudinary = require("cloudinary").v2;
const util = require("util");
const uploader = util.promisify(cloudinary.uploader.upload);
const router = express.Router();
const productModels = require("../models/productModels");

router.get("/", (req, res) => {
  res.render("addItem");
});

router.post("/", async (req, res) => {
  let imageFile = req.files.imageFile;
  const img_id = (await uploader(imageFile.tempFilePath)).public_id;
  


  await productModels.addProduct({...req.body, image: img_id});
  res.redirect("/catalogo");
});


module.exports = router;