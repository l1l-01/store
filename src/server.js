const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/db");

// Importing Routes
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoute");

dotenv.config();

const app = express();

// Parsing req.body
app.use(express.json());
// Parsing cookies
app.use(cookieParser());
// serves images so frontend can access them
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// MongoDB connection
dbConnect();

// Routes
app.use("/admin/", adminRoutes);
app.use("/auth/", authRoutes);

app.use("/", homeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
