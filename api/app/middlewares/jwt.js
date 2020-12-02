import jwt from 'jsonwebtoken';
import { auth } from '../config/auth';
import User from '../db/models/user';

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            errorMessage: 'No token provided!'
        });
    }

    jwt.verify(token, auth.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                errorMessage: 'You are unauthorized!'
            });
        }
        req.userId = decoded.id;
    })

    next();
};

export const isAuthor = (req, res, next) => {

}