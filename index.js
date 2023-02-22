import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/**importing routes */
import UserRoute from "./routes/UserRoute.js";
import DataRoute from "./routes/DataRoute.js";

/**Express server create */
const app = express();

/**Apply bodyparser middlewares */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
dotenv.config();

/**MongoDB connection */
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONG0_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    );
  });

/** routing */
app.use("/user", UserRoute);
app.use("/data", DataRoute);
