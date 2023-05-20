import { Request, Response, NextFunction } from "express";

class siteController {
  index(req: Request, res: Response, next: NextFunction) {
    res.render("home");
  }
}

export default siteController;
