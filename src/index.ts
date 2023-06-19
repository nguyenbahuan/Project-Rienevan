import express, { Express } from "express";
import multer from "multer";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import MysqlDataSource from "./config/db";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import { initialize } from "./utils/passport";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";
import router from "./routers";
import { User } from "./app/models/user.entity";
import { any, number } from "joi";
// import Store from "store2";

dotenv.config();
//express
const app: Express = express();
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "huanba", // Chuỗi bí mật này được sử dụng để mã hóa cookie
    resave: false, // Lưu lại session mỗi khi request
    saveUninitialized: false, // Lưu session mới nếu chưa có
  })
);
initialize(passport);

app.use(passport.initialize());
app.use(passport.authenticate("session"));
app.use(passport.session());
declare module "express-session" {
  export interface SessionData {
    user: User;
  }
}
app.use(flash());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// morgan(app);

app.use(express.json());
//post 3000
const PORT = 3000;
//path to file
app.use(express.static(path.resolve("src/public")));
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum(arr: any) {
        if (typeof arr === "object") return arr.length;
        return 0;
        // return arr;
      },
      checkAmount(amount: number) {
        if (amount > 0) {
          return "Còn hàng";
        }
        return "Hết hàng";
      },
      json: function (value: any, options: any) {
        return JSON.stringify(value);
      },
      checkProducts: function (products: any, options: any) {
        let count = 0;
        for (let i = 0; i < products.length; i++) {
          if (products[i] <= 10) {
            count += 1;
          }
        }
        return count;
      },
      nhan(a: number, b: number) {
        return a * b;
      },
      formatMoney(
        amount: number,
        decimalCount = 2,
        decimal = ".",
        thousands = ","
      ): string {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
          Math.abs(Number(amount) || 0).toFixed(decimalCount)
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)
        );
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(path.resolve("./src/resources"), "views"));
// console.log("hee", path.join("./", "views"));
//routers
router(app);
//database
MysqlDataSource.initialize()
  .then(() => console.log("thành công"))
  .catch(() => console.log("error"));

//test upfiles
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("src/public/upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    return cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
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
