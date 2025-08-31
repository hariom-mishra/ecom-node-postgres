import 'dotenv/config.js';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

export default pool;