"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = __importDefault(require("../app/controllers/cartController"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.render("cart/cart");
});
router.get("/bill", (req, res) => {
    res.render("cart/bill");
});
router.post("/", cartController_1.default.storeBill);
exports.default = router;
