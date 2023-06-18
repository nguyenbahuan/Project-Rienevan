"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const site_1 = __importDefault(require("./site"));
const test_1 = __importDefault(require("./test"));
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const product_1 = __importDefault(require("./product"));
const cart_1 = __importDefault(require("./cart"));
function router(app) {
    app.use("/admin", admin_1.default);
    app.use("/account", auth_1.default);
    app.use("/test", test_1.default);
    app.use("/", site_1.default);
    app.use("/products", product_1.default);
    app.use("/cart", cart_1.default);
}
exports.default = router;
