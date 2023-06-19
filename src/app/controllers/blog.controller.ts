import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
// import multer from "multer";
import { Test } from "../models/test.entity";
import { Blog } from "../models/blog.entity";


class blogController {
  async blogs(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.manager
      .find(Blog)
      .then((blog) => {
        res.render("blogs/table-data-blog", {
          title: "Admin",
          layout: "admin",
          blogs: blog,
        });
      })
      .catch(next);
  }
  async blog(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.manager
      .find(Blog)
      .then((blog) => {
        res.render("blogs/news", {
          title: "News",
          layout: "main",
          blogs: blog,
        });
      })
      .catch(next);
  }

  async createBlog(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.manager
      .find(Blog)
      .then((Blog) => {
        res.render("blogs/form-add-blog", {
          title: "Add ",
          layout: "admin",
        });
      })
      .catch(next);

  }
  async storeBlogs(req: Request, res: Response, next: NextFunction) {
    // res.json(req.body);
    const blog = await new Blog();

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.content = req.body.content;
    blog.img = req.file?.filename || req.body.ImageUpload;
    blog.save()
    res.redirect('/admin/blogs')
     
  }
  async updateBlog(req: Request, res: Response, next: NextFunction) {
      await MysqlDataSource.getRepository(Blog)
        .createQueryBuilder("blogs")
        .update()
        .set({
          title:  req.body.title,
          author : req.body.author,
          content : req.body.content,
          img : req.file?.filename || req.body.imgUpload
        })
        .where("blog.id = :id", { id: req.query.id })
        .execute();
        res.redirect('/admin/blogs')
    }
    async deleteBlog(req: Request, res: Response, next: NextFunction) {
      await MysqlDataSource.getRepository(Blog)
        .createQueryBuilder()
        .delete()
        .where("id = :id", { id: req.query.id })
        .execute();
      res.redirect("/admin/blogs");
    }

    async viewupdateBlog(req: Request, res: Response, next: NextFunction){
      const blog = MysqlDataSource.getRepository(Blog)
      .createQueryBuilder('blog')
      .where('blog.id = :id',{
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


export default new blogController();
