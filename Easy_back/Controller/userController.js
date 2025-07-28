const { User } = require('../Model/index');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const  SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
const hashedPassword = bcrypt.hashSync(password, 10);

const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const user = await User.create({ username, email, password: hashedPassword, role });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role },
       SECRET, 
      { expiresIn: "7d" });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 
      SECRET, 
      { expiresIn: "7d" });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decode.id, {
      attributes: ['id', 'username', 'email', 'role']
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const removeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const ListUsers = async (req, res) => {
  try {
    const list = await User.findAll({
      attributes: ['id', 'username', 'email', 'role']
    });
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser, 
  loginUser,
  getUserProfile,
  removeUser,
  ListUsers
};