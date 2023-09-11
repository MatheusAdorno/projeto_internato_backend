/*
  Warnings:

  - You are about to drop the `_ClassToGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupToSubgroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_id` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `Subgroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassToGroup" DROP CONSTRAINT "_ClassToGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToGroup" DROP CONSTRAINT "_ClassToGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToSubgroup" DROP CONSTRAINT "_GroupToSubgroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToSubgroup" DROP CONSTRAINT "_GroupToSubgroup_B_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "class_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subgroup" ADD COLUMN     "group_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassToGroup";

-- DropTable
DROP TABLE "_GroupToSubgroup";

-- CreateTable
CREATE TABLE "ActivityImplementation" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "hourStart" TIMESTAMP(3) NOT NULL,
    "hourEnd" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "internship_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "hospitalArea_id" TEXT NOT NULL,
    "preceptor_id" TEXT NOT NULL,

    CONSTRAINT "ActivityImplementation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subgroup" ADD CONSTRAINT "Subgroup_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_internship_id_fkey" FOREIGN KEY ("internship_id") REFERENCES "internships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_hospitalArea_id_fkey" FOREIGN KEY ("hospitalArea_id") REFERENCES "HospitalArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityImplementation" ADD CONSTRAINT "ActivityImplementation_preceptor_id_fkey" FOREIGN KEY ("preceptor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
