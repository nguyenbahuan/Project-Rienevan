"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv").config();
const test_entity_1 = require("../../app/models/test.entity");
const user_entity_1 = require("../../app/models/user.entity");
const role_entity_1 = require("../../app/models/role.entity");
const products_entity_1 = require("../../app/models/products.entity");
const categories_entity_1 = require("../../app/models/categories.entity");
const bills_entity_1 = require("../../app/models/bills.entity");
const detail_productsordered_entity_1 = require("../../app/models/detail_productsordered.entity");
const blog_entity_1 = require("../../app/models/blog.entity");
const support_entity_1 = require("../../app/models/support.entity");
// dotenv.config();
const MysqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "product",
    entities: [
        test_entity_1.Test,
        user_entity_1.User,
        role_entity_1.Roles,
        products_entity_1.Products,
        categories_entity_1.Categories,
        bills_entity_1.Bills,
        detail_productsordered_entity_1.DetailsProduct,
        blog_entity_1.Blog,
        support_entity_1.FeedBack,
    ],
    synchronize: true,
    logging: true,
});
exports.default = MysqlDataSource;
