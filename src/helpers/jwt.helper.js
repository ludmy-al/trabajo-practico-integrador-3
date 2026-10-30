import jwt, { TokenExpiredError } from "jsonwebtoken";

//para agregar tokens
export const generateToken = (payLoad) => {
    return jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED_IN,
    });
};

//para verificar tokens
export const verifyToken = (Token) => {
    return jwt.verify(Token, process.env.JWT_SECRET);
};