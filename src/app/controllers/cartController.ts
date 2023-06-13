import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Products } from "../models/products.entity";
const productReRepository = MysqlDataSource.getRepository(Products);
class cartController {
  async Cart(req: Request, res: Response, next: NextFunction) {}
}
export default new cartController();
