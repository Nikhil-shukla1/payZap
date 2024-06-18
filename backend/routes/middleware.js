const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {

  const token = req?.headers?.authorization?.split(" ")[1];
  console.log("middleware");
  // }
  if (!token) {
    return res.status(403).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken.userId) {
      req.userId = decodedToken.userId;
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized!" });
    }
  } catch (e) {
    return res.status(403).json({ message: "Unauthorized!" });
  }
};

module.exports = { authMiddleware };
