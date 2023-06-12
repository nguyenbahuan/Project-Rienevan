import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
// import multer from "multer";
import { Test } from "../models/test.entity";
import { Categories } from "../models/categories.entity";
import { Products } from "../models/products.entity";
import slugify from "slugify";
("../models/Test");
const categoryRepository = MysqlDataSource.getRepository(Categories);
const productsRepository = MysqlDataSource.getRepository(Products);
class adminController {
  async products(req: Request, res: Response, next: NextFunction) {
    const results = await productsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .getMany()
      .then((product) => {
        res.render("admin/products/table-data-product", {
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
        res.render("admin/products/form-add-product", {
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
  //updateProduct
  async editProduct(req: Request, res: Response, next: NextFunction) {
    let data = res.locals.data;

    const categories = await MysqlDataSource.manager.find(Categories);
    // .then((categories) => (data["categories"] = categories));

    // const products = MysqlDataSource.manager
    //   .findOne(Products, {
    //     where: { id: 17 },
    //   })
    //   .then((products) => res.json(products));

    const product = await productsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .where("products.id = :id", { id: req.query.id })
      .getOne();
    // .then((products) => (data["product"] = products))
    // .catch(next);

    // res.render("admin/products/update", {
    //   title: "Edit product",
    //   layout: "admin",
    //   product: product,
    // });
    data = {
      categories: categories,
      product: product,
    };
    // res.json(data);
    // res.json(data);
    res.render("admin/products/update", {
      title: "Edit product",
      layout: "admin",
      data: data,
    });
    // res.render("admin/form-add-product", {
    //   title: "Add product",
    //   layout: "admin",
    //
  }
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const categories = await categoryRepository
      .createQueryBuilder("categories")
      .where("categories.id = :id", { id: req.body.category })
      .getOne();

    if (categories) {
      await productsRepository
        .createQueryBuilder("products")
        .update()
        .set({
          name: req.body.name,
          size: req.body.size,
          color: req.body.color,
          amout: req.body.amout,
          categories: categories,
          desciption: req.body.desciption,
          price: req.body.price,
          img: req.file?.filename || req.body.imgUpload,
        })
        .where("products.id = :id", { id: req.query.id })
        .execute();
    }

    res.redirect("/admin/products");
  }
  async destroyProduct(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.getRepository(Products)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: req.query.id })
      .execute();
    res.redirect("/admin/products");
  }

  //category
  async categories(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.manager
      .find(Categories)
      .then((result) => {
        res.render("admin/categories/categories", {
          title: "Categories",
          layout: "admin",
          categories: result,
        });
      })
      .catch(next);
  }
  async createCategories(req: Request, res: Response, next: NextFunction) {
    res.render("admin/categories/add-category", {
      title: "Categories",
      layout: "admin",
    });
  }
  async storeCategories(req: Request, res: Response, next: NextFunction) {
    const categories = new Categories();
    // categories.name = slugify(req.body.name, {
    //   replacement: "-",
    //   lower: true,
    //   locale: "vi",
    //   trim: true,
    // });
    categories.name = req.body.name;
    categories
      .save()
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch(next);
  }

  async editCategories(req: Request, res: Response, next: NextFunction) {
    // res.json(req.query.id);
    // res.json(req.params.id);
    const category = MysqlDataSource.getRepository("categories")
      .createQueryBuilder()
      .where({
        id: req.query.id,
      })
      .getOne()
      .then((data) => {
        res.render("admin/categories/update", {
          title: "Categories",
          layout: "admin",
          category: data,
        });
      })
      .catch(next);
  }

  async updateCategories(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.getRepository(Categories)
      .createQueryBuilder()
      .update()
      .set({
        name: req.body.name,
        slug: slugify(req.body.name, {
          replacement: "-",
          lower: true,
          locale: "vi",
          trim: true,
        }),
      })
      .where("id = :id", { id: req.query.id })
      .execute();
    res.redirect("/admin/categories");
  }
  async destroyCategories(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.getRepository(Categories)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id: req.query.id })
      .execute();
    res.redirect("/admin/categories");
  }
}

export default new adminController();
