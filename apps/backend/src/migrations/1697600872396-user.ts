import { MigrationInterface, QueryRunner } from "typeorm";

export class User1697600872396 implements MigrationInterface {
    name = 'User1697600872396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_074a1f262efaca6aba16f7ed92\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`firstname\` \`firstname\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`firstname\` \`firstname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('CLIENT', 'ADMIN') NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_074a1f262efaca6aba16f7ed92\` ON \`users\` (\`username\`)`);
    }

}
