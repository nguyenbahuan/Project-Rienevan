"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const site_1 = __importDefault(require("./site"));
const test_1 = __importDefault(require("./test"));
function router(app) {
    app.use("/courses", (req, res) => {
        res.send("Courses hehe");
    });
    app.use("/test", test_1.default);
    app.use("/", site_1.default);
}
exports.default = router;
