"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const blog_entity_1 = require("../models/blog.entity");
("../models/Test");
class blogController {
    async blogs(req, res, next) {
        const results = await db_1.default.manager
            .find(blog_entity_1.Blog)
            .then((blog) => {
            res.render("blogs/table-data-blog", {
                title: "Admin",
                layout: "admin",
                blogs: blog,
            });
        })
            .catch(next);
    }
    async createBlog(req, res, next) {
        await db_1.default.manager
            .find(blog_entity_1.Blog)
            .then((Blog) => {
            res.render("blogs/form-add-blog", {
                title: "Add ",
                layout: "admin",
            });
        })
            .catch(next);
    }
    async storeBlogs(req, res, next) {
        // res.json(req.body);
        const blog = await new blog_entity_1.Blog();
        blog.title = req.body.title;
        blog.author = req.body.author;
        blog.content = req.body.content;
        blog.img = req.file?.filename || req.body.ImageUpload;
        blog.save();
        res.redirect('/admin/blogs');
    }
    async updateBlog(req, res, next) {
        await db_1.default.getRepository(blog_entity_1.Blog)
            .createQueryBuilder("blogs")
            .update()
            .set({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            img: req.file?.filename || req.body.imgUpload
        })
            .where("blogs.id = :id", { id: req.query.id })
            .execute();
        res.redirect('/admin/blogs');
    }
    async deleteBlog(req, res, next) {
        await db_1.default.getRepository(blog_entity_1.Blog)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: req.query.id })
            .execute();
        res.redirect("/admin/blogs");
    }
    async viewupdateBlog(req, res, next) {
        const blog = db_1.default.getRepository(blog_entity_1.Blog)
            .createQueryBuilder('blog')
            .where('blogs.id = :id', {
            id: req.query.id,
        })
            .getOne()
            .then((data) => {
            res.render("blogs/form-update-blog", {
                title: "Blogs",
                layout: "admin",
                blog: data,
            });
        })
            .catch(next);
    }
}
exports.default = new blogController();
