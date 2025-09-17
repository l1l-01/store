const multer = require("multer");
const path = require("path");

// Set storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // folder to store images
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    // creating a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
