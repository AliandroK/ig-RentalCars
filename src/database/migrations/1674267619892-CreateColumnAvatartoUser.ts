import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateColumnAvatartoUser1674267619892
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "User",
      new TableColumn({ name: "avatar", type: "varchar", isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("User", "avatar");
  }
}
