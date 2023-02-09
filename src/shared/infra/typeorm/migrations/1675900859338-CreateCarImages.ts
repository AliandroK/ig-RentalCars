import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarImages1675900859338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Car_Images",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "car_id", type: "uuid" },
          { name: "image_name", type: "varchar" },
          { name: "created_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FK_CarImages_Car",
            columnNames: ["car_id"],
            referencedTableName: "Car",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Car_Images");
  }
}
