import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// SIGN UP
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: savedUser });
  } catch (error) {
    console.error("Signup Error:", error);  // Log the error for debugging
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const secretKey = crypto.randomBytes(64).toString('hex');
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, message: "Logged in successfully!" });
  } catch (error) {
    console.error("Login Error:", error);  // Log the error for debugging
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
