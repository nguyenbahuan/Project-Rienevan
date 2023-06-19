"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = __importDefault(require("../app/controllers/blog.controller"));
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
const router = (0, express_1.Router)();
router.post("/admin/blogs/add-blog", upload.single('ImageUpload'), blog_controller_1.default.storeBlogs);
router.delete("/admin/blogs/delete", blog_controller_1.default.deleteBlog);
router.get("/admin/blogs/add-blog", blog_controller_1.default.createBlog);
router.put("/admin/blogs/update", upload.single('imgUpload'), blog_controller_1.default.updateBlog);
router.get("/admin/blogs/update", blog_controller_1.default.viewupdateBlog);
router.get("/admin/blogs", blog_controller_1.default.blogs);
exports.default = router;
