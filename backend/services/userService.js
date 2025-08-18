const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
dotenv.config();
const prisma = new PrismaClient();

const signup = async ({ name, email, password }) => {
  
  // if user exist
  const userExist = await prisma.user.findUnique({ where: { email } });

  if (userExist) throw new Error("User already exists");

  //hashing password
  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // console.log(token)
  return { 
    user: { id: user.id, name: user.name, email: user.email }, 
    token 
  };
};


const login = async ({ email, password }) => {

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // console.log(token);
  return { 
    user: { id: user.id, name: user.name, email: user.email },
    token 
  };
};

module.exports = { signup, login };

