import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Test } from "../models/test.entity";
("../models/Test");

class adminController {
  async products(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.getRepository(Test).find();
    return res.render("admin/table-data-product", {
      title: "admin",
      layout: "admin",
    });
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    res.render("admin/form-add-product", { title: "admin", layout: "admin" });
  }
  async storeProduct(req: Request, res: Response, next: NextFunction) {
    // res.json(req.body);
    await MysqlDataSource.createQueryBuilder()
      .insert()
      .into(Test)
      .values(req.body)
      .execute();
    res.redirect("/admin");
  }
}

export default new adminController();
