CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "acronym" (
  id uuid DEFAULT uuid_generate_v4(),
  acronym VARCHAR (255),
  meaning VARCHAR (255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS "user" (
  id uuid DEFAULT uuid_generate_v4(),
  email VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE (email)
)
