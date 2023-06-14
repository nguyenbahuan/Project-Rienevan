const LocalStrategy = require("passport-local").Strategy;
import * as bcryptjs from "bcryptjs";
import { User } from "../app/models/user.entity";
import joi from "joi";
/// Định nghĩa chiến lược xác thực

export function initialize(passport: any) {
  passport.use(
    new LocalStrategy(async (username: string, password: string, cb: any) => {
      try {
        const schema = joi.object({
          username: joi
            .string()
            .required()
            .min(6)
            .max(30)
            .error(new Error("Username không hợp lệ")),
          password: joi
            .string()
            .required()
            .min(6)
            .max(30)
            .error(new Error("Password không hợp lệ")),
        });
        const result = schema.validate({ username, password });
        console.log(result);
        if (result.error) {
          const errMessage = result.error.message;
          return cb(null, false, { message: errMessage });
        }
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOneBy({ username: username });
        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
          return cb(null, false, { message: "Người dùng không tồn tại." });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcryptjs.compare(password, user.password);

        if (isMatch) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Sai mật khẩu." });
        }
      } catch (err) {
        return cb(err);
      }
    })
  );
  passport.serializeUser(function (user: User, cb: any) {
    cb(null, user.id);
  });

  passport.deserializeUser(async function (idUser: any, cb: any) {
    const user = await User.findOneBy({ id: idUser });
    if (user) {
      return cb(null, user);
    }
    return cb(null, false);
  });
}
