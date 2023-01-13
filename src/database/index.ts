// import { createConnection } from "typeorm";

import { DataSource } from "typeorm";

// createConnection();

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "igrentalcars",
});
