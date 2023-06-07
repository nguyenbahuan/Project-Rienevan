import { Router } from "express";
import adminController from "../app/controllers/admin.controller";
import checkMiddlerWares from "../middlewares/middlewearAdmin";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("src/public/upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    return cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// import checkMiddlerWares from "../middlewares/middlewearAdmin";
const router = Router();

router.post(
  "/products/add-product",
  upload.single("imgUpload"),
  adminController.storeProduct
);
router.get("/products/add-product", adminController.createProduct);
router.get("/products", adminController.products);
router.get("/", checkMiddlerWares.checkIsAdmin, adminController.products);

export default router;
