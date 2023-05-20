import { Request, Response } from "express";
import siteRouter from "./site";
import testRouter from "./test";
function router(app: any) {
  app.use("/courses", (req: Request, res: Response) => {
    res.send("Courses hehe");
  });
  app.use("/test", testRouter);
  app.use("/", siteRouter);
}

export default router;
