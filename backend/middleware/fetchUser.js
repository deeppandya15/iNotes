var jwt = require("jsonwebtoken");

const JWT_SECRET = "deeppandya123456";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token data:", data);
    req.user = data.userid;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Please authenticate using valid token" });
  }
};
module.exports = fetchUser;
