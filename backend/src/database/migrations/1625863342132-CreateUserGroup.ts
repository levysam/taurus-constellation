import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class CreateUserGroup1625863342132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_group',
        columns: [
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'group_id',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey(
      'user_group',
      ['user_id', 'group_id'],
    );

    await queryRunner.createForeignKey(
      'user_group',
      new TableForeignKey({
        name: 'UserGroup_User',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_group',
      new TableForeignKey({
        name: 'UserGroup_Group',
        columnNames: ['group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'group',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_group', 'UserGroup_User');
    await queryRunner.dropForeignKey('user_group', 'UserGroup_Group');
    await queryRunner.dropTable('user_group');
  }
}
