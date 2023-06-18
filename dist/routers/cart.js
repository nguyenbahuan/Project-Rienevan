"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cartController_1 = __importDefault(require("../app/controllers/cartController"));
// import store from "store2";
const router = (0, express_1.Router)();
var app = (0, express_2.default)();
// app.set('trust proxy', 1) // trust first proxy
app.use((0, express_session_1.default)({
    secret: "minhhai",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
router.get("/", (req, res) => {
    res.render("cart/cart");
});
router.get("/bill", (req, res) => {
    res.render("cart/bill");
});
router.post("/", cartController_1.default.storeBill);
router.get("/test", (req, res, next) => {
    res.send(req.session);
});
exports.default = router;
