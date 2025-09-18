const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.redirect("/auth/login");
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/auth/login");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    // Set token in an HTTP-only cookie
    res.cookie("token", token, {
      // Prevents client-side JavaScript from accessing the cookie
      httpOnly: true,
      // Use secure cookies in production - requires HTTPS
      secure: process.env.NODE_ENV === "production",
      // Protects against CSRF attacks
      sameSite: "Strict",
      // 2 hour in milliseconds
      maxAge: 120 * 60 * 1000,
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    res.status(500).json({ message: `Error logging user: ${error.message}` });
  }
};

const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: `User registered with email ${email}` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error registering User: ${error.message}` });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};

const getLoginPage = async (req, res) => {
  res.render("login");
};

module.exports = {
  login,
  register,
  logout,
  getLoginPage,
};
