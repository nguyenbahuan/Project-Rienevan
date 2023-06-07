"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class authController {
    static login(req, res, next) {
        res.render("home");
    }
    static register(req, res, next) {
        res.render("home");
    }
}
exports.default = authController;
