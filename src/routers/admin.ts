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

//statistical
router.get("/statistical", adminController.statistical);

//categories
router.delete("/categories/delete-category", adminController.destroyCategories);
router.put(
  "/categories/edit-category",
  upload.single("imgUpload"),
  adminController.updateCategories
);
router.get("/categories/edit-category", adminController.editCategories);
router.post("/categories/add-category", adminController.storeCategories);
router.get("/categories/add-category", adminController.createCategories);
router.get("/categories", adminController.categories);

//products
router.post(
  "/products/add-product",
  upload.single("imgUpload"),
  adminController.storeProduct
);
router.delete("/products/delete-product", adminController.destroyProduct);
router.put(
  "/products/edit-product",
  upload.single("imgUpload"),
  adminController.updateProduct
);
router.get("/products/edit-product", adminController.editProduct);
router.get("/products/add-product", adminController.createProduct);
router.get("/products", adminController.products);
router.get("/", checkMiddlerWares.checkIsAdmin, adminController.controller);

export default router;
