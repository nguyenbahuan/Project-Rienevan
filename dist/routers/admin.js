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
router.post("/products/add-product", upload.single("imgUpload"), admin_controller_1.default.storeProduct);
router.get("/products/add-product", admin_controller_1.default.createProduct);
router.get("/products", admin_controller_1.default.products);
router.get("/", middlewearAdmin_1.default.checkIsAdmin, admin_controller_1.default.products);
exports.default = router;
