"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
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
// router.post("/", (req: Request, res: Response) => {
// let { id, quantyti } = req.body;
// const cart = {
//   id: id,
//   Quantyti: quantyti,
// };
//   // req.session.cart = JSON.stringify(cart);
// });
router.get("/test", (req, res, next) => {
    res.send(req.session);
});
exports.default = router;
