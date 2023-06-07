"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const site_1 = __importDefault(require("./site"));
const test_1 = __importDefault(require("./test"));
const path_1 = __importDefault(require("path"));
function router(app) {
    app.use("/account", user_1.default);
    app.use("/test", test_1.default);
    app.use("/", site_1.default);
    app.use("/admin", (req, res) => {
        app.set("views", path_1.default.join("D:\\HUANBA\\TypeScript\\project-type\\src\\resources\\views\\admin"));
        res.render("admin");
    });
}
exports.default = router;
