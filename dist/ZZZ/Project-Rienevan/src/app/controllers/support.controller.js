"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
// import multer from "multer";
const support_entity_1 = require("../models/support.entity");
class FeedBackController {
    async createFeedBack(req, res, next) {
        await db_1.default.manager;
        res.render("support/sendFB", {
            title: "Add ",
            layout: "main",
        });
    }
    async sendFeedBack(req, res, next) {
        // res.json(req.body);
        const Feedback = await new support_entity_1.FeedBack();
        Feedback.name = req.body.name;
        Feedback.email = req.body.email;
        Feedback.phoneNumber = req.body.phoneNumber;
        Feedback.content = req.body.content;
        Feedback.save();
        res.redirect('/feedback');
    }
    async feedbacks(req, res, next) {
        const results = await db_1.default.manager
            .find(support_entity_1.FeedBack)
            .then((feedback) => {
            res.render("support/FBLake", {
                title: "Admin",
                layout: "admin",
                feedback: feedback,
            });
        })
            .catch(next);
    }
    async deleteFeedback(req, res, next) {
        await db_1.default.getRepository(support_entity_1.FeedBack)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: req.query.id })
            .execute();
        res.redirect("/support/FBLake");
    }
}
exports.default = new FeedBackController();
