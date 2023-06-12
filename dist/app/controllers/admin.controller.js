"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const categories_entity_1 = require("../models/categories.entity");
const products_entity_1 = require("../models/products.entity");
const slugify_1 = __importDefault(require("slugify"));
("../models/Test");
const categoryRepository = db_1.default.getRepository(categories_entity_1.Categories);
const productsRepository = db_1.default.getRepository(products_entity_1.Products);
class adminController {
    async products(req, res, next) {
        const results = await productsRepository
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.categories", "categories")
            .getMany()
            .then((product) => {
            res.render("admin/products/table-data-product", {
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
            res.render("admin/products/form-add-product", {
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
    //updateProduct
    async editProduct(req, res, next) {
        let data = res.locals.data;
        const categories = await db_1.default.manager.find(categories_entity_1.Categories);
        // .then((categories) => (data["categories"] = categories));
        // const products = MysqlDataSource.manager
        //   .findOne(Products, {
        //     where: { id: 17 },
        //   })
        //   .then((products) => res.json(products));
        const product = await productsRepository
            .createQueryBuilder("products")
            .leftJoinAndSelect("products.categories", "categories")
            .where("products.id = :id", { id: req.query.id })
            .getOne();
        // .then((products) => (data["product"] = products))
        // .catch(next);
        // res.render("admin/products/update", {
        //   title: "Edit product",
        //   layout: "admin",
        //   product: product,
        // });
        data = {
            categories: categories,
            product: product,
        };
        // res.json(data);
        // res.json(data);
        res.render("admin/products/update", {
            title: "Edit product",
            layout: "admin",
            data: data,
        });
        // res.render("admin/form-add-product", {
        //   title: "Add product",
        //   layout: "admin",
        //
    }
    async updateProduct(req, res, next) {
        const categories = await categoryRepository
            .createQueryBuilder("categories")
            .where("categories.id = :id", { id: req.body.category })
            .getOne();
        if (categories) {
            await productsRepository
                .createQueryBuilder("products")
                .update()
                .set({
                name: req.body.name,
                size: req.body.size,
                color: req.body.color,
                amout: req.body.amout,
                categories: categories,
                desciption: req.body.desciption,
                price: req.body.price,
                img: req.file?.filename || req.body.imgUpload,
            })
                .where("products.id = :id", { id: req.query.id })
                .execute();
        }
        res.redirect("/admin/products");
    }
    async destroyProduct(req, res, next) {
        await db_1.default.getRepository(products_entity_1.Products)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: req.query.id })
            .execute();
        res.redirect("/admin/products");
    }
    //category
    async categories(req, res, next) {
        await db_1.default.manager
            .find(categories_entity_1.Categories)
            .then((result) => {
            res.render("admin/categories/categories", {
                title: "Categories",
                layout: "admin",
                categories: result,
            });
        })
            .catch(next);
    }
    async createCategories(req, res, next) {
        res.render("admin/categories/add-category", {
            title: "Categories",
            layout: "admin",
        });
    }
    async storeCategories(req, res, next) {
        const categories = new categories_entity_1.Categories();
        // categories.name = slugify(req.body.name, {
        //   replacement: "-",
        //   lower: true,
        //   locale: "vi",
        //   trim: true,
        // });
        categories.name = req.body.name;
        categories
            .save()
            .then(() => {
            res.redirect("/admin/categories");
        })
            .catch(next);
    }
    async editCategories(req, res, next) {
        // res.json(req.query.id);
        // res.json(req.params.id);
        const category = db_1.default.getRepository("categories")
            .createQueryBuilder()
            .where({
            id: req.query.id,
        })
            .getOne()
            .then((data) => {
            res.render("admin/categories/update", {
                title: "Categories",
                layout: "admin",
                category: data,
            });
        })
            .catch(next);
    }
    async updateCategories(req, res, next) {
        await db_1.default.getRepository(categories_entity_1.Categories)
            .createQueryBuilder()
            .update()
            .set({
            name: req.body.name,
            slug: (0, slugify_1.default)(req.body.name, {
                replacement: "-",
                lower: true,
                locale: "vi",
                trim: true,
            }),
        })
            .where("id = :id", { id: req.query.id })
            .execute();
        res.redirect("/admin/categories");
    }
    async destroyCategories(req, res, next) {
        await db_1.default.getRepository(categories_entity_1.Categories)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id: req.query.id })
            .execute();
        res.redirect("/admin/categories");
    }
}
exports.default = new adminController();
