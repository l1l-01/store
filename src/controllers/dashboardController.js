const Product = require("../models/product");
const getHomePage = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("dashboard", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getHomePage,
};
