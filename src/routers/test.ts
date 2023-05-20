import { Router, Request, Response } from "express";
import testController from "../app/controllers/testController";
const router = Router();

router.post("/store", testController.store);
router.get("/create", testController.create);
router.get("/:id", testController.index);
router.get("/", testController.home);

export default router;
