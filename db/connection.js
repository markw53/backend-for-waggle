import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${ENV}` });
const config = {};

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL
  config.max = 2
}

const pool = new Pool(config);

export default pool;
