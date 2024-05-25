import path from "path";
import { loadEnvConfig } from "../configs/env";

loadEnvConfig();

export default {
  name: "default",
  type: process.env.DB_TYPE || "postgres",
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, "..", "entities", "**", "*.*"), path.join(__dirname, "..", "entities", "*.*")],
  cli: {
    entitiesDir: "src/entities",
  },
  ssl: process.env.SSL === "true",
};
