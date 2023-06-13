"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const products_entity_1 = require("../models/products.entity");
class siteController {
    async products(req, res, next) {
        let data = res.locals.data;
        const results = await db_1.default.manager.find(products_entity_1.Products);
        const product2 = await db_1.default.getRepository(products_entity_1.Products)
            .createQueryBuilder("Products")
            .where("Products.categoriesId = :categoriesId", { categoriesId: 2 })
            .getMany();
        const product3 = await db_1.default.getRepository(products_entity_1.Products)
            .createQueryBuilder("Products")
            .where("Products.categoriesId = :categoriesId", { categoriesId: 1 })
            .getMany();
        data = {
            products1: results,
            products2: product2,
            products3: product3,
        };
        res.render("main/home", {
            title: "Home",
            layout: "main",
            data: data,
        });
    }
}
exports.default = new siteController();
