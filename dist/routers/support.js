"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const support_controller_1 = __importDefault(require("../app/controllers/support.controller"));
const router = (0, express_1.Router)();
router.delete("/admin/FBLake/delete", support_controller_1.default.deleteFeedback);
router.post("/feedback", support_controller_1.default.sendFeedBack);
router.get("/support/feedback", support_controller_1.default.createFeedBack);
router.get("/admin/FBLake", support_controller_1.default.feedbacks);
exports.default = router;
