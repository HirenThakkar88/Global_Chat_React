import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import express from 'express';

import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const forgotpass  = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = 'hpopat503@rku.ac.in';
const EMAIL_PASS = 'hiren@@__880022'

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Forgot Password Controller
forgotpass.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not registered' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10m' });
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: `Global Chat Support <${EMAIL_USER}>`,
      to: email,
      subject: '🔑 Password Reset Request - Global Chat',
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
                    max-width: 600px; margin: 20px auto; padding: 30px; 
                    background: #1a1a1a; border-radius: 8px; color: #ffffff;">
          <div style="text-align: center; border-bottom: 1px solid #2d2d2d; padding-bottom: 20px;">
            <h2 style="color: #7289da; margin: 0 0 10px 0;">Global Chat Password Reset</h2>
            <p style="color: #b9bbbe; margin: 0;">Click the button below to reset your password</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: #7289da; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 3px; font-weight: 500;
                      display: inline-block; transition: background 0.2s;">
              Reset Password
            </a>
          </div>

          <div style="color: #b9bbbe; font-size: 14px; text-align: center;">
            <p>This link expires in 10 minutes</p>
            <p style="margin-top: 20px; color: #72767d;">
              Can't click the button? Copy this link:<br>
              <span style="word-break: break-all;">${resetLink}</span>
            </p>
          </div>
        </div>
      `
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to process your request' });
  }
});

// Reset Password Controller
// Reset Password Controller - Corrected route to include :token
forgotpass.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params; // Get token from URL parameter
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Reset link has expired' });
    }
    res.status(400).json({ message: 'Invalid reset token' });
  }
});

export default forgotpass;