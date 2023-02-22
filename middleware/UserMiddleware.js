import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_KEY;

const userMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, secret);
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log("error at middleware :", error);
  }
};
export default userMiddleware;
