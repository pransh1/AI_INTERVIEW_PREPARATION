const userService = require("../services/userService.js");

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

const profileController = async(req, res) => {
  try {
    return res.json({message: "Welcome!!", user: req.user});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { signupController, loginController , profileController };
