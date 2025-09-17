const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page" }); // Ensure views/home.ejs exists
});

router.get("/home", (req, res) => {
  res.render("home", { title: "Home Page" }); // Handle /home explicitly
});

module.exports = router;
