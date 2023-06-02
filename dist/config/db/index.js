"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv").config();
const test_entity_1 = require("../../app/models/test.entity");
const user_entity_1 = require("../../app/models/user.entity");
const role_entity_1 = require("../../app/models/role.entity");
// dotenv.config();
const MysqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [test_entity_1.Test, user_entity_1.User, role_entity_1.Roles],
    synchronize: true,
    logging: true,
});
exports.default = MysqlDataSource;
