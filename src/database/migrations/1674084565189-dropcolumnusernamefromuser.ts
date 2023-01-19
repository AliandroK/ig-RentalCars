import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class dropcolumnusernamefromuser1674084565189
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("User", "userName");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "User",
      new TableColumn({ name: "userName", type: "varchar" })
    );
  }
}
