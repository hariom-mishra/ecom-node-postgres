import { errorHandler } from "../middlewares/errorHanlder.middleware.js";
import { getAllUsers, createUser, deleteUser, getUserByEmail, getUserById, updateUser } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import {genrateToken } from '../utils/jwt.js';


export async function getAllUsersService() {
    try {
        return await getAllUsers();
    } catch (err) {
        throw err;
    }
}

export async function getUserByIdService(id) {
    try {   
        return await getUserById(id);
    } catch (err) {
        throw err;
    }
}

export async function createUserService(name, email, password) {
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const saltRound = 10;
        const passwordHash = await bcrypt.hash(password, saltRound);
        const res = await createUser(name, email, passwordHash);
        return res;
    } catch (err) {
        throw err;
    }
}

export async function loginUserService(email, password) {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = genrateToken({ id: user.id, email: user.email, role: user.role });
        if (!token) {
            throw new Error('Failed to generate token');
        }
        user.token = token;
        delete user.password; // Remove password from the user object before returning
        return user;
    } catch (err) {
        throw err;
    }
}