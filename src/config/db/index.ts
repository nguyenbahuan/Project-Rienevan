import { DataSource } from "typeorm";
import {
  CreateCollectionOptions,
  ConnectOptions,
  createConnection,
} from "typeorm";
require("dotenv").config();
import dotenv from "dotenv";
import { Test } from "../../app/models/test.entity";
import { User } from "../../app/models/user.entity";
import { Roles } from "../../app/models/role.entity";
// dotenv.config();

const MysqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "test",
  entities: [Test, User, Roles],
  synchronize: true,
  logging: true,
});
export default MysqlDataSource;
