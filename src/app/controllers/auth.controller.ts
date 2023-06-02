import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import MysqlDataSource from "../../config/db";
import { User } from "../models/user.entity";
import { Roles } from "../models/role.entity";
import { createQuery } from "mysql2/typings/mysql/lib/Connection";
class authController {
  // public async fetchUser(userPost: User, role: Roles) {
  //   const user: User = await MysqlDataSource.manager.findOne(User, {
  //     username: userPost.username,

  //   });
  //   return user;
  // }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await MysqlDataSource.getRepository(User).findOne({
        where: { username: req.body.username },
      });
      if (!user) {
        res.status(404).json("Error account not found");
      }
      const validPassword = await bcryptjs.compare(
        req.body.password,
        user?.password || ""
      );
      if (user && validPassword) {
        const playLoad = {
          username: user.username,
          password: user.password,
          userId: user.id,
        };
        jwt.sign(playLoad, "ưe3uiyu1iy23", { expiresIn: "30m" });
      }
    } catch (error) {}
  }
  static register(req: Request, res: Response, next: NextFunction) {
    const roles = new Roles();
    roles.id = 4;

    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.role = roles;
    user
      .save()
      .then(() => {
        alert("tạo thành công");
        res.redirect("/login");
      })
      .catch(next);
  }
}

export default authController;
