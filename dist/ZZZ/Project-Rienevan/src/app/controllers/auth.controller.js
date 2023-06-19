"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../models/user.entity");
const role_entity_1 = require("../models/role.entity");
const passport_1 = __importDefault(require("passport"));
class authController {
    // public async fetchUser(userPost: User, role: Roles) {
    //   const user: User = await MysqlDataSource.manager.findOne(User, {
    //     username: userPost.username,
    //   });
    //   return user;
    // }
    static async login(req, res, next) {
        // if (req.user?.role.role === "admin") {
        //   res.redirect("/admin");
        // } else res.redirect("/");
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err || !user) {
                const message = info ? info.message : "Đăng nhập thất bại";
                res.json({ message: message });
                return;
            }
            // Đăng nhập thành công
            req.login(user, () => {
                req.session.user = user;
                if (user.role.role === "admin") {
                    res.json({
                        url: "/admin",
                    });
                }
                else {
                    res.json({
                        url: "/",
                    });
                }
            });
        })(req, res, next);
    }
    static register(req, res, next) {
        const roles = new role_entity_1.Roles();
        roles.id = 3;
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
    static async logOut(req, res, next) {
        req.logout((err) => {
            req.session.user = null;
            if (err)
                return next(err);
            res.redirect("/account/login");
        });
    }
}
exports.default = authController;
