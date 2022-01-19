/*
  Warnings:

  - A unique constraint covering the columns `[username,password]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_username_password_key" ON "users"("username", "password");
