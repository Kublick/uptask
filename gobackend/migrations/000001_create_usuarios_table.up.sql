CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuarios (
id bigserial PRIMARY KEY,
created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
nombre text NOT NULL,
email citext UNIQUE NOT NULL,
password_hash bytea NOT NULL,
confirmado bool NOT NULL,
version integer NOT NULL DEFAULT 1
);



	