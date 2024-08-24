// routes/user.routes.js
import auth from "../middlewear/auth.js";
import { Router } from "express";
import userModel from "../models/user.model.js";
const router = Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fname: firstname, lname: lastname, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'You have already registered, please login' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    const accessToken = jwt.sign({ userId: savedUser._id,firstname: savedUser.firstname, email: savedUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = generateRefreshToken(savedUser._id);
    res.status(200).json({ user: savedUser, accessToken, refreshToken, message: 'Successfully Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const savedUser = await userModel.findOne({ email });
    if (!savedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const validPassword = await bcrypt.compare(password, savedUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password.' });
    }
    const accessToken = jwt.sign(
      { userId: savedUser._id, firstname: savedUser.firstname, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = generateRefreshToken(savedUser._id);
    res.status(200).json({ user: savedUser, accessToken, refreshToken, message: 'Successfully Signed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify Token
router.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

// Refresh token endpoint
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required' });
    
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid refresh token' });

      const user = await userModel.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const newToken = jwt.sign(
        { _id: user._id, firstname: user.firstname, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      const newRefreshToken = generateRefreshToken(user._id);
      res.status(200).json({ accessToken: newToken, refreshToken: newRefreshToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Profile
router.get('/user-profile', verifyToken, async (req, res) => {
  try {
    console.log(req.userId,'user')
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "userModel not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }a
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "userModel not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "userModel not found" });
    res.status(200).json({ message: "userModel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

router.post('/send-email', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Subject of your email',
    text: 'Body of your email'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

export default router;
