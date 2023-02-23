import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/user/infra/typeorm/entities/user";
import { app } from "@shared/infra/http/app";
import { myDataSourceMigrations } from "@shared/infra/typeorm/typeorm";

let connection: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await myDataSourceMigrations;
    await connection.initialize();

    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);
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
  });

  afterAll(async () => {
    console.log("caiu aqui cc");
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/autentication")
      .send({ Email: "admin@rentalcars.com", password: "admin" });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category test",
        description: "category test",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(201);
  });

  it("should not to be able to create a new category with same name", async () => {
    const responseToken = await request(app)
      .post("/autentication")
      .send({ Email: "admin@rentalcars.com", password: "admin" });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category test",
        description: "category test",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});
