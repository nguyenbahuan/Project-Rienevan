import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Products } from "../models/products.entity";
import { Categories } from "../models/categories.entity";
const categoryRepository = MysqlDataSource.getRepository(Categories);
const productsRepository = MysqlDataSource.getRepository(Products);
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

  async header(req: Request, res: Response, next: NextFunction) {
    const category = await categoryRepository.find();
    res.render("partials/header", { category: category });
  }

  index(req: Request, res: Response, next: NextFunction) {
    res.render("home");
  }
  async collections(req: Request, res: Response, next: NextFunction) {
    const products = await productsRepository.find();
    res.render("collections", {
      title: "Tất cả sản phẩm",
      layout: "main",
      products: products,
    });
  }
  async selectCollections(req: Request, res: Response, next: NextFunction) {
    const product = await productsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .where("categories.slug like :slug ", {
        slug: `%${req.params.slug}%`,
      })
      .getMany();
    res.render("select-collectoions", { title: "Sản Phẩm", products: product });
  }
  async search(req: Request, res: Response, next: NextFunction) {
    const product = await productsRepository
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.categories", "categories")
      .where(
        "products.name like :q or products.desciption like :q or categories.name like :q",
        {
          q: `%${req.query.q}%`,
        }
      )
      .getMany();
    // res.json(product);
    res.render("search", { title: "Sản Phẩm", products: product });
  }
}

export default new siteController();
