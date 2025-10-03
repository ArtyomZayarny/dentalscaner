-- Remove clinicId column from appointments table
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS "FK_040a7ee2072d45bc98efddf3c02";
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS "FK_01733651151c8a1d6d980135cc4";
ALTER TABLE appointments DROP COLUMN IF EXISTS "clinicId";
