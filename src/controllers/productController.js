const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const create = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // get filename from multer
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updateData = { name, description, price };
    // only update image if a new image file was uploaded
    if (image) updateData.image = image;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete image file from server
    if (product.image) {
      const imagePath = path.join(
        __dirname,
        "../uploads/images",
        product.image,
      );
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", { products });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create, update, deleteOne, getOne, getAll };
