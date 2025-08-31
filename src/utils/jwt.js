import jwt from "jsonwebtoken";
import { errorHandler } from "../middlewares/errorHanlder.middleware.js";

export function genrateToken(payload) {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        return console.log(error);
    }
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}