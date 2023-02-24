-- AlterTable
ALTER TABLE `profiles` MODIFY `full_name` VARCHAR(255) NULL,
    MODIFY `occupation` VARCHAR(255) NULL,
    MODIFY `website` VARCHAR(255) NULL,
    MODIFY `bio` TEXT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `countryCode` VARCHAR(255) NULL;
