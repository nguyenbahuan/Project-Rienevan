"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const test_entity_1 = require("../models/test.entity");
const categories_entity_1 = require("../models/categories.entity");
const products_entity_1 = require("../models/products.entity");
("../models/Test");
const productRepository = db_1.default.getRepository(products_entity_1.Products);
const categoryRepository = db_1.default.getRepository(categories_entity_1.Categories);
class testController {
    async home(req, res, next) {
        const categories = await categoryRepository
            .createQueryBuilder("categories")
            .where({
            id: 2,
        });
        res.json(categories);
    }
    async products(req, res, next) {
        const results = await productRepository
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.categories", "categories")
            .getMany()
            .then((product) => {
            res.json(product);
            // res.render("admin/products/table-data-product", {
            //   title: "Admin",
            //   layout: "admin",
            //   product: product,
            // });
        })
            .catch(next);
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
