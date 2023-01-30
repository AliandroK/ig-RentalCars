import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarSpecification1675035826889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Car_Specification",
        columns: [
          { name: "car_id", type: "uuid" },
          { name: "specification_id", type: "uuid" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],

        uniques: [
          {
            name: "IND_CARID_SPECIFICATIONID",
            columnNames: ["car_id", "specification_id"],
          },
        ],

        foreignKeys: [
          {
            name: "FK_CarSpecification_Car",
            columnNames: ["car_id"],
            referencedTableName: "Car",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },

          {
            name: "FK_CarSpecification_Specification",
            columnNames: ["specification_id"],
            referencedTableName: "specification",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "Car_Specification",
      "FK_CarSpecification_Car"
    );
    await queryRunner.dropForeignKey(
      "Car_Specification",
      "FK_CarSpecification_Specification"
    );
    await queryRunner.dropUniqueConstraint(
      "Car_Specification",
      "IND_CARID_SPECIFICATIONID"
    );

    await queryRunner.dropTable("Car_Specification");
  }
}
