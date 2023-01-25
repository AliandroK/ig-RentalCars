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
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [
    "./src/modules/cars/infra/typeorm/entities/*.ts",
    "./src/modules/user/infra/typeorm/entities/*.ts",
  ],
});
