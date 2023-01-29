import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { User } from "../../../modules/user/infra/typeorm/entities/user";
import { myDataSourceMigrations } from "./typeorm";

async function createUserSeed() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  const connection = myDataSourceMigrations;

  await connection.initialize();

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        id,
        name: "adminUser",
        password,
        Email: "admin@rentalcars.com",
        driver_license: "987654321",
        isAdmin: true,
        created_at: new Date(),
      },
    ])
    .execute();

  await connection.destroy();
}

createUserSeed().then(() => {
  console.log("User admin was created!");
});
