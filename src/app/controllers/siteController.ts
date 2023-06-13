import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Products } from "../models/products.entity";
import { Categories } from "../models/categories.entity";

class siteController {
  async products(req: Request, res: Response, next: NextFunction) {
    let data = res.locals.data;
    const results = await MysqlDataSource.manager.find(Products);

    const product2 = await MysqlDataSource.getRepository(Products)
      .createQueryBuilder("Products")
      .where("Products.categoriesId = :categoriesId", { categoriesId: 2 })
      .getMany();
    const product3 = await MysqlDataSource.getRepository(Products)
      .createQueryBuilder("Products")
      .where("Products.categoriesId = :categoriesId", { categoriesId: 1 })
      .getMany();

    data = {
      products1: results,
      products2: product2,
      products3: product3,
    };
    res.render("main/home", {
      title: "Home",
      layout: "main",
      data: data,
    });
  }
  // async productSlide(req: Request, res: Response, next: NextFunction) {
  //   const firstUser = await MysqlDataSource.getRepository(Products)
  //     .createQueryBuilder("Products")
  //     .where("Products.categoriesId = :categoriesId", { categoriesId: 2 })
  //     .getMany()
  //     .then((productSlide) => {
  //       res.render("main/home", {
  //         title: "Home",
  //         layout: "main",
  //         productSlide: productSlide,
  //       });
  //     });

  //   console.log("------------------------------------------", firstUser);
  // }
}

export default new siteController();
