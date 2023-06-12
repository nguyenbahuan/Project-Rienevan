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
exports.initialize = void 0;
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = __importStar(require("bcryptjs"));
const user_entity_1 = require("../app/models/user.entity");
const joi_1 = __importDefault(require("joi"));
/// Định nghĩa chiến lược xác thực
function initialize(passport) {
    passport.use(new LocalStrategy(async (username, password, cb) => {
        try {
            const schema = joi_1.default.object({
                username: joi_1.default
                    .string()
                    .required()
                    .min(8)
                    .max(30)
                    .error(new Error("Username không hợp lệ")),
                password: joi_1.default
                    .string()
                    .required()
                    .min(8)
                    .max(30)
                    .error(new Error("Password không hợp lệ")),
            });
            const result = schema.validate({ username, password });
            if (result.error) {
                const errMessage = result.error.message;
                return cb(null, false, { message: errMessage });
            }
            // Tìm người dùng trong cơ sở dữ liệu
            const user = await user_entity_1.User.findOneBy({ username: username });
            // Kiểm tra xem người dùng có tồn tại không
            if (!user) {
                return cb(null, false, { message: "Người dùng không tồn tại." });
            }
            // Kiểm tra mật khẩu
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                return cb(null, user);
            }
            else {
                return cb(null, false, { message: "Sai mật khẩu." });
            }
        }
        catch (err) {
            return cb(err);
        }
    }));
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });
    passport.deserializeUser(async function (idUser, cb) {
        const user = await user_entity_1.User.findOneBy({ id: idUser });
        if (user) {
            return cb(null, user);
        }
        return cb(null, false);
    });
}
exports.initialize = initialize;
