"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class siteController {
    index(req, res, next) {
        res.render("home");
    }
}
exports.default = siteController;
