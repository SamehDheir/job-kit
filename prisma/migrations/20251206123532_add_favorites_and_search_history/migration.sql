-- CreateTable
CREATE TABLE "saved_jobs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_companies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_history" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "filters" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "saved_jobs_user_id_created_at_idx" ON "saved_jobs"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "saved_jobs_user_id_job_id_key" ON "saved_jobs"("user_id", "job_id");

-- CreateIndex
CREATE INDEX "saved_companies_user_id_created_at_idx" ON "saved_companies"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "saved_companies_user_id_company_id_key" ON "saved_companies"("user_id", "company_id");

-- CreateIndex
CREATE INDEX "search_history_user_id_created_at_idx" ON "search_history"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_companies" ADD CONSTRAINT "saved_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_companies" ADD CONSTRAINT "saved_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_history" ADD CONSTRAINT "search_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
