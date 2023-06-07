"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("main/home");
});
router.get("/login", (req, res) => {
    res.render("account/login");
});
router.get("/singup", (req, res) => {
    res.render("account/singup");
});
// router.get("/admin", (req: Request, res: Response) => {
//   res.render("admin/admin", { title: "ADMIN", layout: "admin" });
// });
// router.get("/admin/products/add-product", (req: Request, res: Response) => {
//   res.render("admin/form-add-product", { title: "add", layout: "admin" });
// });
// router.get("/admin/products", (req: Request, res: Response) => {
//   res.render("admin/table-data-product", {
//     title: "add Product",
//     layout: "admin",
//   });
// });
exports.default = router;
