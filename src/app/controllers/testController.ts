import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Test } from "../models/test.entity";
("../models/Test");

class testController {
  async home(req: Request, res: Response, next: NextFunction) {
    const results = await MysqlDataSource.getRepository(Test).find();
    return res.render("test/test", {
      test: results,
    });
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
