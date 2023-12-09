import { compare, hash } from "bcryptjs";

async function hashPassword(password){
    const result = await hash(password , 12);
    return result;
}

async function verifyPassword(password , hashPassword){
    const result = await compare(password , hashPassword);
    return result;
}
export {hashPassword , verifyPassword};