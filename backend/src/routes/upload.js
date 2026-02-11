const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer (memory storage - don't save to disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only accept images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// JWT Secret (same as auth.js)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = db => {
  
  // Upload photo endpoint
  router.post("/upload", authenticateToken, upload.single('photo'), async (req, res) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Get form data
      const { title, description, city, country, topicId } = req.body;

      // Validate required fields
      if (!title || !city || !country || !topicId) {
        return res.status(400).json({ error: "Title, city, country, and topic are required" });
      }

      // Upload to Cloudinary using buffer
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'photolabs',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      // Insert photo into database
      const result = await db.query(
        `INSERT INTO photo (full_url, regular_url, city, country, user_id, topic_id, title, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING *`,
        [
          uploadResult.secure_url,
          uploadResult.secure_url,
          city,
          country,
          req.userId,
          topicId,
          title,
          description || null
        ]
      );

      res.status(201).json({
        message: "Photo uploaded successfully",
        photo: result.rows[0]
      });

    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload photo" });
    }
  });

  return router;
};