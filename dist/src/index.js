"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { fileURLToPath } from "url";
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
//express
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: true,
}));
// morgan(app);
app.use(express_1.default.json());
//post 3000
const PORT = 3000;
//path to file
<<<<<<< HEAD:src/dist/index.js
app.use(express_1.default.static("D:\\bui_minh_hai\\Project-Rienevan\\src\\public"));
app.engine(".hbs", (0, express_handlebars_1.engine)({
    extname: ".hbs",
    helpers: {
        sum(a, b) {
            return a + b;
        },
    },
}));
app.set("view engine", ".hbs");
app.set("views", path_1.default.join("D:\\bui_minh_hai\\Project-Rienevan\\src\\resources\\views"));
console.log("hee", path_1.default.join("D:\\bui_minh_hai\\Project-Rienevan\\src\\resources\\views"));
=======
app.use(express_1.default.static("D:\\TypeScript\\Project\\Project-Rienevan\\src\\public"));
app.get('/');
app.engine('hbs', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
app.set("view engine", ".hbs");
<<<<<<< HEAD:dist/src/index.js
app.set("views", path_1.default.join(__dirname, "views"));
console.log("hee", path_1.default.join("D:\\HUANBA\\TypeScript\\project-type\\src\\resources\\views"));
=======
app.set("views", path_1.default.join("D:\\TypeScript\\Project\\Project-Rienevan\\src\\resources\\views"));
// console.log(
//   "hee",
//   path.join("D:\TypeScript\Project\Project-Rienevan\src\resources\views")
// );
>>>>>>> 73eab4230bd6d14e37f23448aa27e1b4ca5c7e84:src/dist/index.js
>>>>>>> 51071653f63938b22681378f269d928c1f0fc8d6:dist/src/index.js
//routers
(0, routers_1.default)(app);
console.log("???????????", __dirname);
//database
db_1.default.initialize()
    .then(() => console.log("thành công"))
    .catch(() => console.log("error"));
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});
