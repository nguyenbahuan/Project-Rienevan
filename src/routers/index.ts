import { Request, Response } from "express";
import { Router } from "express";
import userRotes from "./user";
import siteRouter from "./site";
import testRouter from "./test";
import authRouter from "./auth";
import path from "path";
function router(app: any) {
  app.use("/account", authRouter);
  app.use("/test", testRouter);
  app.use("/", siteRouter);
}

export default router;
