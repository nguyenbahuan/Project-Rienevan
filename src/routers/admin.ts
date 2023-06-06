import { Router } from "express";
import adminController from "../app/controllers/admin.controller";
import checkMiddlerWares from "../middlewares/middlewearAdmin";
// import checkMiddlerWares from "../middlewares/middlewearAdmin";
const router = Router();

router.post("/products/add-product", adminController.createProduct);
router.get("/products/add-product", adminController.createProduct);
router.get("/products", adminController.products);
router.get("/", checkMiddlerWares.checkIsAdmin, adminController.products);

export default router;
