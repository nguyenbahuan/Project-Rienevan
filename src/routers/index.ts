import { Request, Response } from "express";
import { Router } from "express";
import userRotes from "./user";
import siteRouter from "./site";
import testRouter from "./test";
import authRouter from "./auth";
import adminRouter from "./admin";
import productRouter from "./product";
import Cart from "./cart";
import path from "path";
import checkMiddlerWares from "../middlewares/middlewearAdmin";
function router(app: any) {
  app.use("/admin", adminRouter);
  app.use("/account", authRouter);
  app.use("/test", testRouter);
  app.use("/", siteRouter);
  app.use("/products", productRouter);
  app.use("/cart", Cart);
}

export default router;
