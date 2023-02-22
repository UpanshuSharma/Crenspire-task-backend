import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const getDataAPI = async (req, res) => {
  axios
    .get(process.env.DATA_API)
    .then((myres) => {
      //   console.log(myres);
      res.status(200).json(myres.data);
    })
    .catch((error) => {
      //   console.log(error);
      res.status(500).json(error);
    });
};
