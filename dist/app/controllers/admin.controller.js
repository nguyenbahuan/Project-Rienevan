"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const categories_entity_1 = require("../models/categories.entity");
const products_entity_1 = require("../models/products.entity");
("../models/Test");
class adminController {
    async products(req, res, next) {
        const results = await db_1.default.manager
            .find(products_entity_1.Products)
            .then((product) => {
            res.render("admin/table-data-product", {
                title: "Admin",
                layout: "admin",
                product: product,
            });
        })
            .catch(next);
    }
    async createProduct(req, res, next) {
        await db_1.default.manager
            .find(categories_entity_1.Categories)
            .then((category) => {
            res.render("admin/form-add-product", {
                title: "Add product",
                layout: "admin",
                category: category,
            });
        })
            .catch(next);
        // res.render("admin/form-add-product", {
        //   title: "Add product",
        //   layout: "admin",
        // });
    }
    async storeProduct(req, res, next) {
        // res.json(req.body);
        const product = new products_entity_1.Products();
        const categories = new categories_entity_1.Categories();
        categories.id = req.body.category;
        product.name = req.body.name;
        product.size = req.body.size;
        product.amout = req.body.amout;
        product.color = req.body.color;
        product.desciption = req.body.desciption;
        product.price = req.body.price;
        product.img = req.file?.filename || req.body.imgUpload;
        product.categories = categories;
        product
            .save()
            .then(() => {
            res.redirect("/admin/products");
        })
            .catch(next);
    }
}
exports.default = new adminController();
