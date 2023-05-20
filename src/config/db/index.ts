import { DataSource } from "typeorm";
import { Test } from "../../app/models/test.entity";

const MysqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "test",
  entities: [Test],
  synchronize: true,
  logging: true,
});
export default MysqlDataSource;
