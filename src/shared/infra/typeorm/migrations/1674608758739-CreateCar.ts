import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCar1674608758739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Car",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "daily_rate",
            type: "float",
          },
          {
            name: "available",
            type: "boolean",
          },
          {
            name: "license_plate",
            type: "varchar",
          },
          {
            name: "fine_amount",
            type: "float",
          },
          {
            name: "brand",
            type: "varchar",
          },
          {
            name: "categoty_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],

        foreignKeys: [
          {
            name: "FK_CAR_CATEGORIES",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["categoty_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Car");
  }
}
