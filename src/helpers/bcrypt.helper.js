import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

//para hashear tokens
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

//para comparar contraseñas
export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};