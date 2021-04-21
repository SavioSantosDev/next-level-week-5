import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatingMessagesTable1619034047365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'admin_id',
            type: 'uuid',
            isNullable: true, // Quando o usuário mandar msg pode ser que o admin ainda não esteja lá
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKUsers',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
