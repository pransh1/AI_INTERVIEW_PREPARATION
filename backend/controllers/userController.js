const userService = require("../services/userService.js");
const {PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signupController = async(req, res) => {
  try {
    const { name, email, password } = req.body;
    const userCreated = await userService.signup({name, email, password});
    return res.status(201).json({message:"User created successfuly", ...userCreated});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

const loginController = async(req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggedIn = await userService.login({email, password});
    return res.status(201).json({message:"User loggedIn successfuly", ...userLoggedIn});
  } catch (error) {
    return res.status(401).json({error: error.message});
  }
}

const profileController = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.user.userId) },
      select: { id: true, name: true, email: true } 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "Welcome!!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { signupController, loginController , profileController };
