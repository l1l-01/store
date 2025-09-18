const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController.js");

router.get("/", ProductController.getAll);
module.exports = router;
