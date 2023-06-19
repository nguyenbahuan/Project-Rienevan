"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class checkMiddlerWares {
    static checkLogin(req, res, next) {
        const user = req.session.user;
        if (user) {
            next();
        }
        else {
            res.redirect("/account/singup");
        }
    }
    static checkIsAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            const userLogin = req.user;
            if (userLogin && userLogin.role.role === "admin") {
                // res.redirect("/admin");
                next();
            }
            else {
                res.redirect("/");
            }
        }
        else {
            res.redirect("account/login");
        }
    }
}
exports.default = checkMiddlerWares;
