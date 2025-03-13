-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" JSONB,
    "tld" TEXT[],
    "independent" BOOLEAN,
    "status" TEXT,
    "unMember" BOOLEAN,
    "currencies" JSONB,
    "idd" JSONB,
    "capital" TEXT[],
    "region" TEXT,
    "subregion" TEXT,
    "languages" JSONB,
    "latlng" DOUBLE PRECISION[],
    "landlocked" BOOLEAN,
    "flag" TEXT,
    "maps" JSONB,
    "population" INTEGER,
    "timezones" TEXT[],
    "continents" TEXT[],
    "flags" JSONB,
    "startOfWeek" TEXT,
    "capitalInfo" JSONB,
    "postalCode" JSONB,
    "borders" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);
