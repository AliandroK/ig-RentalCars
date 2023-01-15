import { DataSource } from "typeorm";

import { myDataSource } from ".";

const options = { ...myDataSource.options, host: "localhost" };

export const myDataSourceMigrations = new DataSource(options);
