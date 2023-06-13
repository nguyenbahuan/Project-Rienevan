import { Router, Request, Response, NextFunction } from "express";
import express, { Express } from "express";
import session from "express-session";
import internal from "stream";
import { User } from "../app/models/user.entity";
import { json } from "stream/consumers";
// import store from "store2";
const router = Router();
var app = express();
// app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    secret: "minhhai",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
declare module "express-session" {
  export interface SessionData {
    cart: any;
  }
}

router.get("/", (req: Request, res: Response) => {
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

router.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send(req.session);
});

export default router;
