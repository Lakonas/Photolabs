const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT (in production, use environment variable!)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

module.exports = db => {
  
  // REGISTER - Create new user account
  router.post("/auth/register", async (req, res) => {
    const { email, password, username, fullname } = req.body;

    // Validate input
    if (!email || !password || !username || !fullname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    try {
      // Check if user already exists
      const existingUser = await db.query(
        "SELECT * FROM user_account WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash the password
      const password_hash = await bcrypt.hash(password, 10);

      // Insert new user
      const result = await db.query(
        `INSERT INTO user_account (email, password_hash, username, fullname, profile_url)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, username, fullname, created_at`,
        [email, password_hash, username, fullname, "/images/profile-default.jpg"]
      );

      const user = result.rows[0];

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullname: user.fullname
        }
      });

    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "Server error during registration" });
    }
  });

  // LOGIN - Authenticate existing user
  router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    try {
      // Find user by email
      const result = await db.query(
        "SELECT * FROM user_account WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = result.rows[0];

      // Check if user has a password (seed data users don't!)
      if (!user.password_hash) {
        return res.status(401).json({ error: "This account cannot login" });
      }

      // Compare password with hash
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullname: user.fullname
        }
      });

    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error during login" });
    }
  });

  // VERIFY - Check if token is valid and return user info
  router.get("/auth/me", async (req, res) => {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from database
      const result = await db.query(
        "SELECT id, email, username, fullname, created_at FROM user_account WHERE id = $1",
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      res.json({ user: result.rows[0] });

    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      console.error("Verify token error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  return router;
};