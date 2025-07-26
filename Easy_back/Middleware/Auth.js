const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded; // Attach user info to request
    next();
  });
}

module.exports = authMiddleware;
