import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import MysqlDataSource from "../../config/db";
import { User } from "../models/user.entity";
import { Roles } from "../models/role.entity";
import passport from "passport";
class authController {
  // public async fetchUser(userPost: User, role: Roles) {
  //   const user: User = await MysqlDataSource.manager.findOne(User, {
  //     username: userPost.username,

  //   });
  //   return user;
  // }
  static async login(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role.role === "admin") {
      res.redirect("/admin");
    } else res.redirect("/");
  }
  static register(req: Request, res: Response, next: NextFunction) {
    const roles = new Roles();
    roles.id = 3;
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = roles;
    user
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch(next);
  }
}

export default authController;
