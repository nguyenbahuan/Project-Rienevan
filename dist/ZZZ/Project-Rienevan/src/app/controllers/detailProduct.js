"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const products_entity_1 = require("../models/products.entity");
const productReRepository = db_1.default.getRepository(products_entity_1.Products);
class detailController {
    async detailProduct(req, res, next) {
        const results = await productReRepository
            .createQueryBuilder("products")
            .where("products.id = :id", {
            id: req.params.id,
        })
            .getOne()
            .then((detailProduct) => {
            res.render("cart/detailProduct", {
                title: "detail product",
                layout: "main",
                product: detailProduct,
            });
            //  res.json(detailProduct);
        })
            .catch(next);
    }
}
exports.default = new detailController();
