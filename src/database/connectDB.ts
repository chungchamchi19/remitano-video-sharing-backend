import { DataSource } from "typeorm";
import ormConfig from "./ormconfig";
import { loadEnvConfig } from "../configs/env";

export const appDataSource = new DataSource(ormConfig as any);
loadEnvConfig();

const connectDB = function (callback?: (...args: any[]) => void) {
  if (appDataSource.isInitialized) {
    callback && callback();
    return;
  }
  appDataSource
    .initialize()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Connected to the database!");
      callback && callback();
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log("Can not connect to the db: ", e, ormConfig);
    });
};

export default connectDB;
