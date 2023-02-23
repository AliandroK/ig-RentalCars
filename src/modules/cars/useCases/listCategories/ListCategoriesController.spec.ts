import { hash } from "bcryptjs";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/user/infra/typeorm/entities/user";
import { app } from "@shared/infra/http/app";
import { myDataSourceMigrations } from "@shared/infra/typeorm/typeorm";

let connection: DataSource;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    console.log("caiu aqui list");
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
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able list all categories", async () => {
    const responseToken = await request(app)
      .post("/autentication")
      .send({ Email: "admin@rentalcars.com", password: "admin" });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "category test",
        description: "category test",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(201);
    expect(response.body.lenght).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("category test");
  });
});
