import pg from "pg"
import dotenv from "dotenv"

dotenv.config();


const { Pool } = pg

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
}

if (process.env.MODE === "prod") configDatabase.ssl = true

const db = new Pool(configDatabase)

export default db;

// export const userSchema = joi.object({
//   name: joi.string().required(),
//   phone: joi.string().required(),
//   cpf: joi.string().required(),
//   birthday: joi.string().required()
// });