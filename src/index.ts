import express, { Express } from "express";
import { engine } from "express-handlebars";
import MysqlDataSource from "./config/db";
import path from "path";
import morgan from "morgan";
// import { fileURLToPath } from "url";
import router from "./routers";

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
app.use(express.static("D:\\HUANBA\\TypeScript\\project-type\\src\\public"));

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
app.set(
  "views",
  path.join("D:\\HUANBA\\TypeScript\\project-type\\src\\resources\\views")
);
console.log(
  "hee",
  path.join("D:\\HUANBA\\TypeScript\\project-type\\src\\resources\\views")
);
//routers
router(app);

//database
MysqlDataSource.initialize()
  .then(() => console.log("thành công"))
  .catch(() => console.log("error"));

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
