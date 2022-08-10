const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"] || "";

  token = token.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.id;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  let token = req.headers["authorization"] || "";
  token = token.split(" ")[1];

  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ error: "Admin resource! Access denied!" });
    }
  }
  next();
};

const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = createAccessToken({ id: user.id });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};



const isMerchant = (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ error: "Merchant resource! Access denied!" });
  }
  next();
};

module.exports = { isAdmin, refreshToken, verifyToken, isMerchant };