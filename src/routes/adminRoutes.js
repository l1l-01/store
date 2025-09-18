const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const AuthController = require("../controllers/authController");
const Upload = require("../middlewares/upload");
const DashboardController = require("../controllers/dashboardController");
const ProtectWithRole = require("../middlewares/protectWithRole");

router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.post(
  "/products/create",
  Upload.single("image"),
  ProductController.create,
);
router.put(
  "/products/update/:id",
  Upload.single("image"),
  ProductController.update,
);
router.delete("/products/delete/:id", ProductController.deleteOne);

router.get(
  "/dashboard",
  ProtectWithRole("admin"),
  DashboardController.getHomePage,
);
router.get(
  "/dashboard/products",
  ProtectWithRole("admin"),
  DashboardController.getProductFormPage,
);
router.get(
  "/dashboard/products/:id",
  ProtectWithRole("admin"),
  DashboardController.getUpdateProductPage,
);

router.post("/register", AuthController.register);

module.exports = router;
