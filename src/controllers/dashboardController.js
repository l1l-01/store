const Product = require("../models/product");
const getHomePage = async (req, res) => {
  try {
    const products = await Product.find();
    const totalProducts = await Product.countDocuments();
    const mostExpensiveProduct = await Product.findOne().sort({ price: -1 });
    res.render("dashboard", { products, totalProducts, mostExpensiveProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getProductFormPage = (req, res) => {
  res.render("addProduct");
};

const getUpdateProductPage = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("updateProduct", { product });
};

module.exports = {
  getHomePage,
  getProductFormPage,
  getUpdateProductPage,
};
