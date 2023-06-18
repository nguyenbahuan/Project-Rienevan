import { Router, Request, Response } from "express";
import authController from "../app/controllers/auth.controller";
import passport from "passport";
import checkMiddlerWares from "../middlewares/middlewearAdmin";
const router = Router();

router.get("/logout", authController.logOut);
router.post("/login", authController.login);
router.get("/login", (req: Request, res: Response) => {
  res.render("account/login");
});

router.post("/singup", authController.register);
router.get("/singup", (req: Request, res: Response) => {
  res.render("account/singup");
});

export default router;
