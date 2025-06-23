import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

//Thick Mode
oracledb.initOracleClient({ libDir: "C:\\instantclient_11_2" });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT,
};

export async function initOracle() {
  await oracledb.createPool(dbConfig);
  console.log("Oracle DB pool started");
}

export default dbConfig;
