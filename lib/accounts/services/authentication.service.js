import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RedisInstance from '../../cache/instance.js';
import dotenv from 'dotenv';
dotenv.config();

const JwtBlacklist = new RedisInstance();
const KEY_VALUE = "invalid"

export async function hashPassword(password) {
    return bcrypt.hash(password, parseInt(process.env.HASH_SALT_ROUNDS));
};

export async function verifyHashPassword(enteredPassword, storedHashPassword) {
    return bcrypt.compare(enteredPassword, storedHashPassword);
};

export function createJwtToken(id, name, role) {
    return {
        token: jwt.sign(
            { id, name, role },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }),
        expiresIn: process.env.JWT_TOKEN_EXPIRY
    }
};

export async function analyseJwtToken(token, targetId = null) {
    if (token == null)
        throw ({ name: 'JsonWebTokenError' });
    const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN_SECRET);
    const status = await JwtBlacklist.getObject(token)
    if (status)
        throw ({ name: 'JsonWebTokenError' });

    return decodedToken;
}

export async function blacklistJwtToken(token, tokenData) {
    const insertionStatus = await JwtBlacklist.createObject(token, KEY_VALUE);
    await JwtBlacklist.setExpiryOfObject(token, +tokenData.exp);
}
