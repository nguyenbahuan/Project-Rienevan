import express, { Express } from "express";
import { engine } from "express-handlebars";
import MysqlDataSource from "./config/db";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
// import { fileURLToPath } from "url";
import router from "./routers";

dotenv.config();
//express
const app: Express = express();
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
      sum(a: number, b: number) {
        return a + b;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(path.resolve("./src/resources"), "views"));
// console.log("hee", path.join("./", "views"));
//routers
router(app);
console.log("???????????", path.resolve("src/public"));
//database
MysqlDataSource.initialize()
  .then(() => console.log("thành công"))
  .catch(() => console.log("error"));

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
