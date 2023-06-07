import { Request, Response, NextFunction } from "express";
class checkMiddlerWares {
  public static checkLogin(req: Request, res: Response, next: NextFunction) {
    const user = req.session.user;
    if (user) {
      next();
    } else {
      res.redirect("/account/singup");
    }
  }
  public static checkIsAdmin(req: Request, res: any, next: any) {
    if (req.isAuthenticated()) {
      const userLogin = req.user;
      if (userLogin && userLogin.role.role === "admin") {
        // res.redirect("/admin");
        next();
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("account/login");
    }
  }
}
export default checkMiddlerWares;
