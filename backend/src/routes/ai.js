const router = require("express").Router();
const Anthropic = require("@anthropic-ai/sdk");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const FormData = require("form-data");

// Polyfill for older Node versions
if (!globalThis.Headers) {
  globalThis.Headers = fetch.Headers;
}
if (!globalThis.FormData) {
  globalThis.FormData = FormData;
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  fetch: fetch
});
// JWT Secret
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
  
  // Generate AI description for image
  router.post("/describe", authenticateToken, async (req, res) => {
    try {
      const { image } = req.body;

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      // Validate base64 format
      if (!image.startsWith('data:image/')) {
        return res.status(400).json({ error: "Invalid image format" });
      }

      // Extract media type and base64 data
      const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ error: "Invalid base64 image" });
      }

      const mediaType = `image/${matches[1]}`;
      const base64Data = matches[2];

      // Call Claude Vision API
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: base64Data
                }
              },
              {
                type: "text",
                text: "Describe this photo in 1-2 concise sentences (max 40 words). Capture the essence, mood, and key visual elements. Be vivid but brief."
              }
            ]
          }
        ]
      });

      // Extract description from response
      const description = message.content[0].text;

      res.json({ description });

    } catch (error) {
      console.error("AI description error:", error);
      res.status(500).json({ error: "Failed to generate description" });
    }
  });

  return router;
};