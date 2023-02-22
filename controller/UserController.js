import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 *        Register a User
 */
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const { email, password } = req.body;
  //...password encryption..............
  const hashedpassword = await bcrypt.hash(password, salt);
  req.body.password = hashedpassword;

  const newuser = new UserModel(req.body);

  try {
    const olduser = await UserModel.findOne({ email });
    if (olduser) {
      return res.status(400).json("Email already in Use");
    }
    const user = await newuser.save();
    //............Using JWT Tokens......
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res
      .status(500)
      .json("Error in User registration: ", { message: error.message });
  }
};

/**
 *  Login User
 */

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        res.status(400).json("Wrong Password");
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
      }
    } else {
      res.status(400).json("User not exist");
    }
  } catch (error) {
    res.status(400).json("Error in user login ", { message: error.message });
  }
};
