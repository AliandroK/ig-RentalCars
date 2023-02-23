// import { createConnection } from "typeorm";

import { DataSource } from "typeorm";

// createConnection();

export const myDataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : "database_ig",
  port: 5432,
  username: "docker",
  password: "ignite",
  database:
    process.env.NODE_ENV === "test" ? "test_igrentalcars" : "igrentalcars",
  migrations: ["./src/shared/infra/typeorm/migrations/*.{ts,js}"],
  entities: [
    "./src/modules/cars/infra/typeorm/entities/*.{ts,js}",
    "./src/modules/user/infra/typeorm/entities/*.{ts,js}",
    "./src/modules/rentals/infra/typeorm/entities/*.{ts,js}",
  ],
});
