"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../app/controllers/admin.controller"));
const middlewearAdmin_1 = __importDefault(require("../middlewares/middlewearAdmin"));
// import checkMiddlerWares from "../middlewares/middlewearAdmin";
const router = (0, express_1.Router)();
router.post("/products/add-product", admin_controller_1.default.createProduct);
router.get("/products/add-product", admin_controller_1.default.createProduct);
router.get("/products", admin_controller_1.default.products);
router.get("/", middlewearAdmin_1.default.checkIsAdmin, admin_controller_1.default.products);
exports.default = router;
