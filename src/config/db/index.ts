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
import { Products } from "../../app/models/products.entity";
import { Categories } from "../../app/models/categories.entity";
import { Bills } from "../../app/models/bills.entity";
import { DetailsProduct } from "../../app/models/detail_productsordered.entity";
import { Blog } from "../../app/models/blog.entity";
import { FeedBack } from "../../app/models/support.entity";
// dotenv.config();

const MysqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "test1",
  entities: [
    Test,
    User,
    Roles,
    Products,
    Categories,
    Bills,
    DetailsProduct,
    Blog,
    FeedBack,
  ],
  synchronize: true,
  logging: true,
});
export default MysqlDataSource;
