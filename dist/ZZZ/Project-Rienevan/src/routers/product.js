"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detailProduct_1 = __importDefault(require("../app/controllers/detailProduct"));
const router = (0, express_1.Router)();
router.get("/:id", detailProduct_1.default.detailProduct);
// router.post("/:id", (req: Request, res: Response) => {
//   res.json(req.body.quantity);
// });
exports.default = router;
