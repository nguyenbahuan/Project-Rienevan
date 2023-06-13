import { Router, Request, Response } from "express";
import detailController from "../app/controllers/detailProduct";
const router = Router();

router.get("/:id", detailController.detailProduct);
// router.post("/:id", (req: Request, res: Response) => {
//   res.json(req.body.quantity);
// });
export default router;
