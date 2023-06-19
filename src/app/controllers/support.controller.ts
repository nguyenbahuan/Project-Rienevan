import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
// import multer from "multer";
import { Test } from "../models/test.entity";
import { FeedBack } from '../models/support.entity';

class FeedBackController {

  async createFeedBack(req: Request, res: Response, next: NextFunction) {
    await MysqlDataSource.manager
        res.render("support/sendFB", {
          title: "Add ",
          layout: "main",
        });
  }
      async sendFeedBack(req: Request, res: Response, next: NextFunction) {
        // res.json(req.body);
        const Feedback = await new FeedBack();
        Feedback.name = req.body.name;
        Feedback.email = req.body.email;
        Feedback.phoneNumber = req.body.phoneNumber;
        Feedback.content = req.body.content;
        Feedback.save()
        res.redirect('/feedback')
      }
      async feedbacks(req: Request, res: Response, next: NextFunction) {
        const results = await MysqlDataSource.manager
          .find(FeedBack)
          .then((feedback) => {
            res.render("support/FBLake", {
              title: "Admin",
              layout: "admin",
              feedback: feedback,
            });
          })
          .catch(next);
      }
      async deleteFeedback(req: Request, res: Response, next: NextFunction) {
        await MysqlDataSource.getRepository(FeedBack)
          .createQueryBuilder()
          .delete()
          .where("id = :id", { id: req.query.id })
          .execute();
        res.redirect("/admin/FBLake");
      }
}


export default new FeedBackController();
