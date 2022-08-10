import {MigrationInterface, QueryRunner} from "typeorm";

export class QueueCreateColumnCompliance1659549952784 implements MigrationInterface {
    name = 'QueueCreateColumnCompliance1659549952784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `taurus-constellation`.queue ADD compliance varchar(100) NULL");
        await queryRunner.query("ALTER TABLE `taurus-constellation`.queue CHANGE compliance compliance varchar(100) NULL AFTER description");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `taurus-constellation`.queue DROP COLUMN compliance");
    }

}
