// import { createConnection } from "typeorm";

import { DataSource } from "typeorm";

// createConnection();

export const myDataSource = new DataSource({
  type: "postgres",
  host: "database_ig",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "igrentalcars",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/cars/entities/*.ts"],
});
