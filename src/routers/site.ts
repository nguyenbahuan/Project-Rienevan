import { Router, Request, Response } from "express";
import authController from "../app/controllers/auth.controller";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("home");
});
router.get("/login", (req: Request, res: Response) => {
  res.render("account/login");
});
router.get("/singup", (req: Request, res: Response) => {
  res.render("account/singup");
});

// router.get("/admin", (req: Request, res: Response) => {
//   res.render("admin/admin", { title: "ADMIN", layout: "admin" });
// });
// router.get("/admin/products/add-product", (req: Request, res: Response) => {
//   res.render("admin/form-add-product", { title: "add", layout: "admin" });
// });

// router.get("/admin/products", (req: Request, res: Response) => {
//   res.render("admin/table-data-product", {
//     title: "add Product",
//     layout: "admin",
//   });
// });
export default router;
