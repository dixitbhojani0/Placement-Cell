import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { jwtToken, jwtKey } = req.cookies;
  jwt.verify(jwtToken, jwtKey, (err, data) => {
    if (err) {
      res.status(400).send("unauthorized! login to continue!");
    } else {
      req.user = data.user;
      next();
    }
  });
};
