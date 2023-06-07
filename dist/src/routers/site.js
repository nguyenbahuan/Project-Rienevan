"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("home");
});
router.get("/admin", (req, res) => {
    res.render("admin/admin");
});
router.get("/tableProducts", (req, res) => {
    res.render("admin/table-data-product");
});
router.get("/addProduct", (req, res) => {
    res.render("admin/form-add-product");
});
exports.default = router;
