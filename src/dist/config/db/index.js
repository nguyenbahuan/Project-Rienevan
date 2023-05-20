"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const test_entity_1 = require("../../app/models/test.entity");
const MysqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [test_entity_1.Test],
    synchronize: true,
    logging: true,
});
exports.default = MysqlDataSource;
