import { Router, Request, Response } from "express";
import blogController from "../app/controllers/blog.controller";
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

const router = Router();


router.post("/admin/blogs/add-blog",upload.single('ImageUpload'),blogController.storeBlogs);
router.delete("/admin/blogs/delete", blogController.deleteBlog);
router.get("/admin/blogs/add-blog",blogController.createBlog);
router.put("/admin/blogs/update",upload.single('imgUpload'),blogController.updateBlog);
router.get("/admin/blogs/update",blogController.viewupdateBlog);
router.get("/admin/blogs", blogController.blogs);
router.get("/news",blogController.blog);
export default router;