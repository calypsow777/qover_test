-- CreateTable
CREATE TABLE "Price" (
    "carMake" TEXT NOT NULL,
    "globalYearlyPrice" INTEGER NOT NULL,
    "universalYearlyPrice" INTEGER NOT NULL,
    "universalYearlyMultiplier" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Price.carMake_unique" ON "Price"("carMake");
