import { Router, Request, Response } from "express";
import FeedBackController from "../app/controllers/support.controller";
import multer from "multer";
import path from "path";


const router = Router();
router.delete("/admin/FBLake/delete", FeedBackController.deleteFeedback);
router.post("/feedback",FeedBackController.sendFeedBack);
router.get("/support/feedback",FeedBackController.createFeedBack);
router.get("/admin/FBLake",FeedBackController.feedbacks);

export default router;