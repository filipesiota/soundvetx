/*
  Warnings:

  - You are about to drop the column `createdAt` on the `exam_requests` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `exam_requests` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exam_requests` table. All the data in the column will be lost.
  - You are about to drop the column `canSendWhatsapp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `veterinarians` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `veterinarians` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `exam_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `exam_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `veterinarians` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exam_requests" DROP CONSTRAINT "exam_requests_userId_fkey";

-- DropForeignKey
ALTER TABLE "veterinarians" DROP CONSTRAINT "veterinarians_userId_fkey";

-- DropIndex
DROP INDEX "veterinarians_userId_key";

-- AlterTable
ALTER TABLE "exam_requests" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "canSendWhatsapp",
DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "can_send_whatsapp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "veterinarians" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "veterinarians_user_id_key" ON "veterinarians"("user_id");

-- AddForeignKey
ALTER TABLE "veterinarians" ADD CONSTRAINT "veterinarians_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_requests" ADD CONSTRAINT "exam_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
