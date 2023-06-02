import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("home");
});

router.get("/admin", (req: Request, res: Response) => {
  res.render("admin/admin");
});
router.get("/tableProducts", (req: Request, res: Response) => {
  res.render("admin/table-data-product");
});

router.get("/addProduct", (req: Request, res: Response) => {
  res.render("admin/form-add-product");
});
export default router;
