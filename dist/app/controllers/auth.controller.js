"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../models/user.entity");
const role_entity_1 = require("../models/role.entity");
class authController {
    // public async fetchUser(userPost: User, role: Roles) {
    //   const user: User = await MysqlDataSource.manager.findOne(User, {
    //     username: userPost.username,
    //   });
    //   return user;
    // }
    static async login(req, res, next) {
        if (req.user?.role.role === "admin") {
            res.redirect("/admin");
        }
        else
            res.redirect("/");
    }
    static register(req, res, next) {
        const roles = new role_entity_1.Roles();
        roles.id = 4;
        const user = new user_entity_1.User();
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
exports.default = authController;
