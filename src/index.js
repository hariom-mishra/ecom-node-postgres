import app from "./app.js";
import dotenv from "dotenv";
import pool from "./db/index.js";
import { initializeTables } from "./db/initTables.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

async function testConnection() {
  try {
    const client = await pool.connect();
    initializeTables();
    console.log('✅ Connected to PostgreSQL');
    
    // optional test query
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0]);

    client.release(); // release back to pool
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error connecting to the database:', err);
    process.exit(1); // exit with failure
  }
}

testConnection();
