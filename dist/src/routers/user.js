"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../app/controllers/user.controller"));
const router = (0, express_1.Router)();
router.post("/singup", user_controller_1.default.store);
router.get("/singup", user_controller_1.default.singup);
router.get("/login", user_controller_1.default.login);
router.get("/testuser", user_controller_1.default.testUsseer);
exports.default = router;
