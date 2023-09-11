/*
  Warnings:

  - Added the required column `adress` to the `hospitals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cicle_id` to the `internships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalArea_id` to the `internships` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_id` to the `internships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hospitals" ADD COLUMN     "adress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "internships" ADD COLUMN     "cicle_id" TEXT NOT NULL,
ADD COLUMN     "hospitalArea_id" TEXT NOT NULL,
ADD COLUMN     "period_id" TEXT NOT NULL,
ADD COLUMN     "preceptor_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "classId" TEXT,
ADD COLUMN     "groupId" TEXT;

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subgroup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cicle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Cicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HospitalArea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hospital_id" TEXT NOT NULL,

    CONSTRAINT "HospitalArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToSubgroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToGroup_AB_unique" ON "_ClassToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToGroup_B_index" ON "_ClassToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToSubgroup_AB_unique" ON "_GroupToSubgroup"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToSubgroup_B_index" ON "_GroupToSubgroup"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_cicle_id_fkey" FOREIGN KEY ("cicle_id") REFERENCES "Cicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_hospitalArea_id_fkey" FOREIGN KEY ("hospitalArea_id") REFERENCES "HospitalArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internships" ADD CONSTRAINT "internships_preceptor_id_fkey" FOREIGN KEY ("preceptor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HospitalArea" ADD CONSTRAINT "HospitalArea_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToGroup" ADD CONSTRAINT "_ClassToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToGroup" ADD CONSTRAINT "_ClassToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSubgroup" ADD CONSTRAINT "_GroupToSubgroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToSubgroup" ADD CONSTRAINT "_GroupToSubgroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Subgroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
