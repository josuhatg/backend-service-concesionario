import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cars } from "./entities/Cars";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Cars],
  migrations:[],
  subscribers:[]
});
 