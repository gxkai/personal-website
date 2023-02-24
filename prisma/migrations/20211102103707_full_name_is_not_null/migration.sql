/*
  Warnings:

  - Made the column `full_name` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profiles` MODIFY `full_name` VARCHAR(255) NOT NULL;
