/*
  Warnings:

  - You are about to alter the column `universalYearlyMultiplier` on the `Price` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "carMake" TEXT NOT NULL,
    "globalYearlyPrice" INTEGER NOT NULL,
    "universalYearlyPrice" INTEGER NOT NULL,
    "universalYearlyMultiplier" REAL NOT NULL
);
INSERT INTO "new_Price" ("carMake", "globalYearlyPrice", "universalYearlyMultiplier", "universalYearlyPrice") SELECT "carMake", "globalYearlyPrice", "universalYearlyMultiplier", "universalYearlyPrice" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price.carMake_unique" ON "Price"("carMake");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
