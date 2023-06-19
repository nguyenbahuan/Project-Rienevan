import { Router, Request, Response, NextFunction } from "express";
import cartController from "../app/controllers/cartController";
import manageInvoiceController from "../app/controllers/manageInvoiceController";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("cart/cart");
});

router.get("/bill", (req: Request, res: Response) => {
  res.render("cart/bill");
});
router.post("/", cartController.storeBill);

export default router;
