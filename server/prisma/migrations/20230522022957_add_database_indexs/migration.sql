-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Memory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coverUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Memory" ("content", "coverUrl", "created_at", "id", "isPublic", "userId") SELECT "content", "coverUrl", "created_at", "id", "isPublic", "userId" FROM "Memory";
DROP TABLE "Memory";
ALTER TABLE "new_Memory" RENAME TO "Memory";
CREATE INDEX "Memory_userId_idx" ON "Memory"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
