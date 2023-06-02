"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../config/db"));
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
        try {
            const user = await db_1.default.getRepository(user_entity_1.User).findOne({
                where: { username: req.body.username },
            });
            if (!user) {
                res.status(404).json("Error account not found");
            }
            const validPassword = await bcryptjs_1.default.compare(req.body.password, user?.password || "");
            if (user && validPassword) {
                const playLoad = {
                    username: user.username,
                    password: user.password,
                    userId: user.id,
                };
                jwt.sign(playLoad, "ưe3uiyu1iy23", { expiresIn: "30m" });
            }
        }
        catch (error) { }
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
            alert("tạo thành công");
            res.redirect("/login");
        })
            .catch(next);
    }
}
exports.default = authController;
