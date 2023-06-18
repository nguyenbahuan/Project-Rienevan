"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const products_entity_1 = require("../models/products.entity");
const categories_entity_1 = require("../models/categories.entity");
const categoryRepository = db_1.default.getRepository(categories_entity_1.Categories);
const productsRepository = db_1.default.getRepository(products_entity_1.Products);
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
    async header(req, res, next) {
        const category = await categoryRepository.find();
        res.render("partials/header", { category: category });
    }
    index(req, res, next) {
        res.render("home");
    }
    async collections(req, res, next) {
        const products = await productsRepository.find();
        res.render("collections", {
            title: "Tất cả sản phẩm",
            layout: "main",
            products: products,
        });
    }
    async selectCollections(req, res, next) {
        const product = await productsRepository
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.categories", "categories")
            .where("categories.slug like :slug ", {
            slug: `%${req.params.slug}%`,
        })
            .getMany();
        res.render("select-collectoions", { title: "Sản Phẩm", products: product });
    }
    async search(req, res, next) {
        const product = await productsRepository
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.categories", "categories")
            .where("products.name like :q or products.desciption like :q or categories.name like :q", {
            q: `%${req.query.q}%`,
        })
            .getMany();
        // res.json(product);
        res.render("search", { title: "Sản Phẩm", products: product });
    }
}
exports.default = new siteController();
