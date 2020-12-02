import { User } from '../db/models';
import { Op } from 'sequelize';

export const getUserByUsername = async (username) => {
    let user = null;

    try {
        user = await User.findOne({ where: { username: username }});
    } catch (err) {
        console.warn(err);
        throw new Error(err);
    }

    return user;
}

export const getUserByEmail = async (email) => {
    let user = null;

    try {
        user = await User.findOne({ where: { email: email }});
    } catch (err) {
        console.warn(err);
        throw new Error(err);
    }

    return user;
}

export const getUserByUsernameOrEmail = async (input) => {
    let user = null;

    try {
        user = await User.findOne({ 
            where: {
                [Op.or]: [
                    { username: input },
                    { email: input }
                ]
            }
        });
    } catch (err) {
        console.warn(err);
        throw new Error(err);
    }

    return user;
};