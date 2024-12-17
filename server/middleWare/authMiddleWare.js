const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //bearer sfdsdfsfdsf
    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Error: No authorization" });
  }
};
