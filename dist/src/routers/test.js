"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = __importDefault(require("../app/controllers/testController"));
const router = (0, express_1.Router)();
router.post("/store", testController_1.default.store);
router.get("/create", testController_1.default.create);
router.get("/hehe", testController_1.default.index);
router.get("/", testController_1.default.home);
exports.default = router;
