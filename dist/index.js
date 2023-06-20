"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const method_override_1 = __importDefault(require("method-override"));
const express_handlebars_1 = require("express-handlebars");
const db_1 = __importDefault(require("./config/db"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = require("./utils/passport");
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const passport_2 = __importDefault(require("passport"));
const routers_1 = __importDefault(require("./routers"));
// import Store from "store2";
dotenv_1.default.config();
//express
const app = (0, express_1.default)();
app.use((0, method_override_1.default)("_method"));
app.use((0, express_session_1.default)({
    secret: "huanba",
    resave: false,
    saveUninitialized: false, // Lưu session mới nếu chưa có
}));
(0, passport_1.initialize)(passport_2.default);
app.use(passport_2.default.initialize());
app.use(passport_2.default.authenticate("session"));
app.use(passport_2.default.session());
app.use((0, express_flash_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// morgan(app);
app.use(express_1.default.json());
//post 3000
const PORT = 3000;
//path to file
app.use(express_1.default.static(path_1.default.resolve("src/public")));
app.engine(".hbs", (0, express_handlebars_1.engine)({
    extname: ".hbs",
    helpers: {
        sum(arr) {
            if (typeof arr === "object")
                return arr.length;
            return 0;
            // return arr;
        },
        checkAmount(amount) {
            if (amount > 0) {
                return "Còn hàng";
            }
            return "Hết hàng";
        },
        json: function (value, options) {
            return JSON.stringify(value);
        },
        checkProducts: function (products, options) {
            let count = 0;
            for (let i = 0; i < products.length; i++) {
                if (products[i] <= 10) {
                    count += 1;
                }
            }
            return count;
        },
        nhan(a, b) {
            return a * b;
        },
        formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            const negativeSign = amount < 0 ? "-" : "";
            let i = parseInt(Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = i.length > 3 ? i.length % 3 : 0;
            return (negativeSign +
                (j ? i.substr(0, j) + thousands : "") +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands));
        },
    },
}));
app.set("view engine", ".hbs");
app.set("views", path_1.default.join(path_1.default.resolve("./src/resources"), "views"));
// console.log("hee", path.join("./", "views"));
//routers
(0, routers_1.default)(app);
//database
db_1.default.initialize()
    .then(() => console.log("thành công"))
    .catch(() => console.log("error"));
//test upfiles
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path_1.default.resolve("src/public/upload"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        return cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.get("/upload", (req, res) => {
    res.render("upload");
});
app.post("/upload", upload.single("file-load"), (req, res) => {
    console.log(req.body);
    console.log("h///////////////////", req.file);
    res.send("thành công");
});
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});
