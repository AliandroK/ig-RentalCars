import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRental1676247885350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Rental",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "startDate",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "endDate",
            type: "timestamp",
          },
          {
            name: "expect_return_date",
            type: "timestamp",
          },
          {
            name: "total",
            type: "numeric",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],

        foreignKeys: [
          {
            name: "FK_Rental_Car",
            columnNames: ["car_id"],
            referencedTableName: "Car",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },

          {
            name: "FK_Rental_User",
            columnNames: ["user_id"],
            referencedTableName: "User",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Rental");
  }
}
