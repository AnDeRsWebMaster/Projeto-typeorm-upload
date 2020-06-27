import {MigrationInterface, QueryRunner,TableForeignKey} from "typeorm";

export class AlterTransactionsRelations1593245882357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: 'CategoryTransaction',
            columnNames:['category_id'],
            referencedColumnNames:['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions','CategoryTransaction')
    }

}
