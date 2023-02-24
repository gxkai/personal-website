-- AlterTable
ALTER TABLE `users` ADD COLUMN `provider` VARCHAR(255) NULL,
    ADD COLUMN `providerData` TEXT NULL,
    ADD COLUMN `providerId` VARCHAR(255) NULL;
