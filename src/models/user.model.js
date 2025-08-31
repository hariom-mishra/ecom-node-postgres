import pool from "../db/index.js";
import { errorHandler } from "../middlewares/errorHanlder.middleware.js";

export async function initiateUserModel() {
    return await pool.query(
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    );
}

export async function getAllUsers() {
    try {
        const result = await pool.query(`
        SELECT id, name, email, role FROM users
        `);
        return result.rows;
    } catch (error) {
        errorHandler(error);
    }
}

export async function createUser(name, email, password, role = 'user') {
    try {
        const res = await pool.query(
            `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4) RETURNING *
        `,
            [name, email, password, role]
        );
        return res.rows[0];
    } catch (error) {
        throw error;
    }

}

export async function getUserByEmail(email) {
    try {
        const res = await pool.query(
            `
        SELECT * FROM users WHERE email = $1
        `,
            [email]
        );
        return res.rows[0];
    } catch (error) {
        next(error);
    }

}

export async function getUserById(id) {
    const res = await pool.query(
        `
        SELECT id, name, email, role FROM users WHERE id = $1
        `,
        [id]
    );
    return res.rows[0];
}

export async function deleteUser(id) {
    return await pool.query(
        `
        DELETE FROM users WHERE id = $1
        `,
        [id]
    );
}

export async function updateUser(id, name, email) {
    return await pool.query(
        `
        UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *
        `,
        [name, email, id]
    );
}