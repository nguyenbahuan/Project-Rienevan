"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../app/controllers/admin.controller"));
const middlewearAdmin_1 = __importDefault(require("../middlewares/middlewearAdmin"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path_1.default.resolve("src/public/upload"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        return cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
// import checkMiddlerWares from "../middlewares/middlewearAdmin";
const router = (0, express_1.Router)();
//categories
router.delete("/categories/delete-category", admin_controller_1.default.destroyCategories);
router.put("/categories/edit-category", upload.single("imgUpload"), admin_controller_1.default.updateCategories);
router.get("/categories/edit-category", admin_controller_1.default.editCategories);
router.post("/categories/add-category", admin_controller_1.default.storeCategories);
router.get("/categories/add-category", admin_controller_1.default.createCategories);
router.get("/categories", admin_controller_1.default.categories);
//products
router.post("/products/add-product", upload.single("imgUpload"), admin_controller_1.default.storeProduct);
router.delete("/products/delete-product", admin_controller_1.default.destroyProduct);
router.put("/products/edit-product", upload.single("imgUpload"), admin_controller_1.default.updateProduct);
router.get("/products/edit-product", admin_controller_1.default.editProduct);
router.get("/products/add-product", admin_controller_1.default.createProduct);
router.get("/products", admin_controller_1.default.products);
router.get("/", middlewearAdmin_1.default.checkIsAdmin, admin_controller_1.default.products);
exports.default = router;
