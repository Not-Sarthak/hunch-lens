-- CreateTable
CREATE TABLE "TokenizedAsset" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenizedAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenizedAsset_url_key" ON "TokenizedAsset"("url");

-- CreateIndex
CREATE UNIQUE INDEX "TokenizedAsset_publicAddress_key" ON "TokenizedAsset"("publicAddress");
