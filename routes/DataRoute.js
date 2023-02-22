import express from "express";
import { getDataAPI } from "../controller/DataController.js";
import userMiddleware from "../middleware/UserMiddleware.js";
const router = express.Router();
router.get("/getData/:id", userMiddleware, getDataAPI);
// router.get("/getData", getDataAPI);
export default router;
