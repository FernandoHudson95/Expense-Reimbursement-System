import express from 'express';

export const userClass = express.Router();


const user = {
    firstname: {
            type: String,
            required: [true, 'First name is required']

    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    role: {
        type: String,
        required: [true, 'Employee role is required']
    }
}