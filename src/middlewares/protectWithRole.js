const jwt = require("jsonwebtoken");

const protectWithRole = (...allowedRoles) => {
  return (req, res, next) => {
    let token = req.cookies.token;

    // Check if token is present in cookies or headers
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!token && authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    try {
      // Check if token is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access Denied", code: "UNAUTHORIZED_ACTION" });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: `Token is not valid: ${error.message}` });
    }
  };
};

module.exports = protectWithRole;
