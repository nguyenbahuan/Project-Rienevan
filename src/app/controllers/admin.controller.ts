import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
// import multer from "multer";
import { Test } from "../models/test.entity";
import { Categories } from "../models/categories.entity";
import { Products } from "../models/products.entity";
("../models/Test");

class adminController {
  async products(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.manager
      .find(Products)
      .then((product) => {
        res.render("admin/table-data-product", {
          title: "Admin",
          layout: "admin",
          product: product,
        });
      })
      .catch(next);
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.manager
      .find(Categories)
      .then((category) => {
        res.render("admin/form-add-product", {
          title: "Add product",
          layout: "admin",
          category: category,
        });
      })
      .catch(next);
    // res.render("admin/form-add-product", {
    //   title: "Add product",
    //   layout: "admin",
    // });
  }
  async storeProduct(req: Request, res: Response, next: NextFunction) {
    // res.json(req.body);
    const product = new Products();
    const categories = new Categories();
    categories.id = req.body.category;
    product.name = req.body.name;
    product.size = req.body.size;
    product.amout = req.body.amout;
    product.color = req.body.color;
    product.desciption = req.body.desciption;
    product.price = req.body.price;
    product.img = req.file?.filename || req.body.imgUpload;
    product.categories = categories;
    product
      .save()
      .then(() => {
        res.redirect("/admin/products");
      })
      .catch(next);
  }
}

export default new adminController();
