import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Products } from "../models/products.entity";
const productReRepository = MysqlDataSource.getRepository(Products);
class detailController {
  async detailProduct(req: Request, res: Response, next: NextFunction) {
    const results = await productReRepository
      .createQueryBuilder("products")
      .where("products.id = :id", {
        id: req.params.id,
      })
      .getOne()
      .then((detailProduct) => {
        res.render("cart/detailProduct", {
          title: "detail product",
          layout: "main",
          product: detailProduct,
        });
        //  res.json(detailProduct);
      })
      .catch(next);
  }
}
export default new detailController();
