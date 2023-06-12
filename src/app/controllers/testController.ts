import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Test } from "../models/test.entity";
import { Categories } from "../models/categories.entity";
import { Products } from "../models/products.entity";
import { User } from "../models/user.entity";
("../models/Test");
const productRepository = MysqlDataSource.getRepository(Products);
const categoryRepository = MysqlDataSource.getRepository(Categories);
class testController {
  async home(req: Request, res: Response, next: NextFunction) {
    const categories = await categoryRepository
      .createQueryBuilder("categories")
      .where({
        id: 2,
      });
    res.json(categories);
  }
  async products(req: Request, res: Response, next: NextFunction) {
    const results = await productRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .getMany()
      .then((product) => {
        res.json(product);
        // res.render("admin/products/table-data-product", {
        //   title: "Admin",
        //   layout: "admin",
        //   product: product,
        // });
      })
      .catch(next);
  }
  async index(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.getRepository(Test).findOneBy({
      firstName: req.params.slug,
    });
    return res.json(results);
  }
  create(req: Request, res: Response, next: NextFunction) {
    res.render("test/create");
  }
  async store(req: Request, res: Response, next: NextFunction) {
    // res.json(req.body);
    await MysqlDataSource.createQueryBuilder()
      .insert()
      .into(Test)
      .values(req.body)
      .execute();
    res.redirect("/test");
  }
}

export default new testController();
