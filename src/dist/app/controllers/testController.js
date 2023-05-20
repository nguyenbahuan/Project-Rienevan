"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const test_entity_1 = require("../models/test.entity");
("../models/Test");
class testController {
    async home(req, res, next) {
        const results = await db_1.default.getRepository(test_entity_1.Test).find();
        return res.render("test/test", {
            test: results,
        });
    }
    async index(req, res, next) {
        const results = await db_1.default.getRepository(test_entity_1.Test).findOneBy({
            firstName: req.params.slug,
        });
        return res.json(results);
    }
    create(req, res, next) {
        res.render("test/create");
    }
    async store(req, res, next) {
        // res.json(req.body);
        await db_1.default.createQueryBuilder()
            .insert()
            .into(test_entity_1.Test)
            .values(req.body)
            .execute();
        res.redirect("/test");
    }
}
exports.default = new testController();
