"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("home");
});
router.get("/login", (req, res) => {
    res.render("account/login");
});
router.get("/singup", (req, res) => {
    res.render("account/singup");
});
exports.default = router;
