"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const siteController_1 = __importDefault(require("../app/controllers/siteController"));
const router = (0, express_1.Router)();
router.get("/", siteController_1.default.products);
// router.get("/products", (req: Request, res: Response) => {
//   res.render("cart/detailProduct");
// });
// router.get("/login", (req: Request, res: Response) => {
//   res.render("account/login");
// });
// router.get("/singup", (req: Request, res: Response) => {
//   res.render("account/singup");
// });
router.get("/search", siteController_1.default.search);
router.get("/collections/:slug", siteController_1.default.selectCollections);
router.get("/collections", siteController_1.default.collections);
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
