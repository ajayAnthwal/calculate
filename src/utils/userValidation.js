// const { createHmac, randomBytes } = require("crypto");
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// CREATE HASH
export const hashPassword = async (password) => {
  try {
    const salt = process.env.SALT_ROUND;
    console.log("req came here");

    const hashed = await bcrypt.hash(password, salt);
    console.log("hased password", hashed);

    return hashed;
  } catch (err) {}
};

// Verify the JWT token
export const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;

    const payload = jwt.verify(token, secret);
    
    return payload;
  } catch (err) {}
};
