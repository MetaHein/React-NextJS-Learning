import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepo } from "../repositories/user.repo.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRY = "7d";

export const authService = {
  async signup(userData) {
    // Check if user exists
    const existingUser = await userRepo.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);

    // Create user
    const userId = await userRepo.create({
      email: userData.email,
      password_hash,
      name: userData.name,
    });

    // Generate token
    const token = this.generateToken({ userId, email: userData.email });

    return {
      user: {
        id: userId,
        email: userData.email,
        name: userData.name,
      },
      token,
    };
  },

  async login(credentials) {
    // Find user
    const user = await userRepo.findByEmail(credentials.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password_hash,
    );
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate token
    const token = this.generateToken({ userId: user.id, email: user.email });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  },

  async getCurrentUser(userId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },

  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
};

export default authService;
