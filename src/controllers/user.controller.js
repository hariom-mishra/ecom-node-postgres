import express from 'express';
import { getAllUsersService, createUserService , loginUserService, getUserByIdService} from '../services/user.services.js';
import AppError from '../utils/AppError.js';
import AppResponse from '../utils/AppResponse.js';

export const registerUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};

        if(!name || !email || !password) {
            return next(new AppError('Name, email and password are required', 400));
        }

        const user = await createUserService(name, email, password);
        res.json(new AppResponse({
            message: 'User created successfully',
            statusCode: 201,
            data: user,
        }));
    } catch (error) {
        res.json(new AppError('Failed to create user', 500));
    }
};

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body || {};
        if(!email || !password) {
            return next(new AppError('Email and password are required', 400));
        }
        const user = await loginUserService(email, password);
        res.json(new AppResponse({
            message: 'User logged in successfully',
            statusCode: 200,
            data: user,
        }));
    } catch (error) {
        next(error);
    }
};

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.json(new AppResponse({
            message: 'Users fetched successfully',
            statusCode: 200,
            data: users,
        }));
    } catch (error) {
        res.json(new AppError('Failed to fetch users', 500));
    }
};

export const getUserProfileController = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user =  await getUserByIdService(id);
        if(!user) {
            return next(new AppError('User not found', 404));
        }
        res.json(new AppResponse({
            message: 'User fetched successfully',
            statusCode: 200,
            data: user,
        }));
    } catch (error) {
        next(error);
    }
};