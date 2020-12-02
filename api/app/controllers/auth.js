import { User } from '../db/models/index';
import { generateSalt, generateHashedPassword } from '../utils/encryption';
import { getUserByUsername, getUserByEmail, getUserByUsernameOrEmail } from '../helpers/auth';
import jwt from 'jsonwebtoken';
import { auth } from '../config/auth';

export default {
    register: async (req, res) => {
        let { body } = req;
        let data = {
            username: '',
            password: '',
            email: '',
            fullName: ''
        }

        let errors = {};

        if (body?.email || body.email?.length > 0) {
            data.email = body.email;
        } else {
            errors.email = 'Email is required.'
        }

        if (body?.username || body.username?.length > 0) {
            data.username = body.username;
        } else {
            errors.username = 'Username is required.'
        }

        if (body?.fullName || body.fullName?.length > 0) {
            data.fullName = body.fullName;
        } else {
            errors.fullName = 'Full Name is required.'
        }

        if (body?.password || body.password?.length > 0) {
            data.password = body.password;
        } else {
            errors.password = 'Password is required.'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors
            });
        }

        try {
            let user = await getUserByUsername(data.username);

            if (user != null) {
                return res.status(400).json({
                    errorMessage: 'This username is already taken'
                });
            }

            user = await getUserByEmail(data.email);

            if (user != null) {
                return res.status(400).json({
                    errorMessage: 'This email is already taken'
                });
            }
        } catch(err) {
            console.warn(err);
            return res.status(500).json({
                errorMessage: 'An error occurred while trying to register!'
            });
        }

        data.salt = generateSalt();
        data.password = generateHashedPassword(data.password, data.salt);

        try {
            let user = await User.create(data);
        } catch(err) {
            console.warn(err);
            return res.status(500).json({
                errorMessage: 'An error occurred while trying to register!'
            });
        }

        return res.status(200).json({
            successMessage: 'Successfully registered a new user!'
        });
    },
    login: async (req, res) => {
        let { body } = req;
        let data = {
            input: '',
            password: ''
        };
        let errors = {};

        if (body?.input || body.input?.length > 0) {
            data.input = body.input;
        } else {
            errors.input = 'Username/Email is required.'
        }

        if (body?.password || body.password?.length > 0) {
            data.password = body.password;
        } else {
            errors.password = 'Password is required.'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                errors: errors
            });
        }

        let user = null;

        try {
            user = await getUserByUsernameOrEmail(data.input);
        } catch (err) {
            console.warn(err);
            return res.status(500).json({
                errorMessage: 'An error occurred while trying to login!'
            });
        }

        if (user == null) {
            return res.status(401).json({
                errorMessage: 'User with this username/email does not exist!'
            })
        }

        let salt = user.salt;
        let hashedPassword = generateHashedPassword(data.password, salt);

        if (hashedPassword != user.password) {
            return res.status(400).json({
                errorMessage: 'Password is not correct!'
            });
        }

        var token = jwt.sign({ id: user.id }, auth.secret, {
            expiresIn: 86400
        });

        res.status(200).json({
            successMessage: 'Successfully logged in!',
            id: user.id,
            accessToken: token
        });
    }
};

