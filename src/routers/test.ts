import { Router, Request, Response } from "express";
import testController from "../app/controllers/testController";
const router = Router();

router.get("/product", testController.products);
router.post("/store", testController.store);
router.get("/create", testController.create);
router.get("/hehe", testController.index);
router.get("/", testController.home);

export default router;
