const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const AuthController = require("../controllers/authController");
const Upload = require("../middlewares/upload");
const DashboardController = require("../controllers/dashboardController");
const ProtectWithRole = require("../middlewares/protectWithRole");

router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.post("/products", Upload.single("image"), ProductController.create);
router.put("/products/:id", Upload.single("image"), ProductController.update);
router.delete("/products/:id", ProductController.deleteOne);

router.get("/dashboard", DashboardController.getHomePage);
router.get("/product", DashboardController.getProductFormPage);
router.get("/product/:id", DashboardController.getUpdateProductPage);

router.post("/register", AuthController.register);

module.exports = router;
