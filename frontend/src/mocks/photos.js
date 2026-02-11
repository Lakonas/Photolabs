const router = require("express").Router();

module.exports = db => {
  // Helper function to format photo URL
  const formatPhotoUrl = (url, serverUrl) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${serverUrl}/images/${url}`;
  };

  router.get("/photos", async (req, res) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    try {
      const { rows } = await db.query(`
        SELECT photo.id, photo.full_url, photo.regular_url, photo.city, 
               photo.country, photo.topic_id, user_account.username, 
               user_account.fullname, user_account.profile_url
        FROM photo
        JOIN user_account ON user_account.id = photo.user_id
        ORDER BY photo.id;
      `);

      const photosWithSimilar = await Promise.all(rows.map(async (photo) => {
        const similarResult = await db.query(`
          SELECT similar_photo.id, similar_photo.full_url, similar_photo.regular_url,
                 similar_photo.city, similar_photo.country, similar_user.username,
                 similar_user.fullname, similar_user.profile_url
          FROM photo AS similar_photo
          JOIN user_account AS similar_user ON similar_user.id = similar_photo.user_id
          WHERE similar_photo.id <> $1 AND similar_photo.topic_id = $2
          LIMIT 4
        `, [photo.id, photo.topic_id]);

        return {
          id: photo.id,
          urls: {
            full: formatPhotoUrl(photo.full_url, serverUrl),
            regular: formatPhotoUrl(photo.regular_url, serverUrl)
          },
          user: {
            username: photo.username,
            name: photo.fullname,
            profile: formatPhotoUrl(photo.profile_url, serverUrl)
          },
          location: { city: photo.city, country: photo.country },
          similar_photos: similarResult.rows.map(s => ({
            id: s.id,
            urls: {
              full: formatPhotoUrl(s.full_url, serverUrl),
              regular: formatPhotoUrl(s.regular_url, serverUrl)
            },
            user: {
              username: s.username,
              name: s.fullname,
              profile: formatPhotoUrl(s.profile_url, serverUrl)
            },
            location: { city: s.city, country: s.country }
          }))
        };
      }));

      res.json(photosWithSimilar);
    } catch (err) {
      console.error('Photos error:', err);
      res.status(500).json({ error: 'Failed to fetch photos' });
    }
  });

  router.get("/photos/search", async (req, res) => {
    const searchTerm = req.query.q;
    const protocol = req.protocol;
    const host = req.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    if (!searchTerm || searchTerm.trim() === '') {
      return res.json([]);
    }

    try {
      const { rows } = await db.query(`
        SELECT photo.id, photo.full_url, photo.regular_url, photo.city,
               photo.country, photo.topic_id, user_account.username,
               user_account.fullname, user_account.profile_url
        FROM photo
        JOIN user_account ON user_account.id = photo.user_id
        WHERE LOWER(photo.city) LIKE LOWER($1) OR LOWER(photo.country) LIKE LOWER($1)
        ORDER BY photo.id;
      `, [`%${searchTerm}%`]);

      const photosWithSimilar = await Promise.all(rows.map(async (photo) => {
        const similarResult = await db.query(`
          SELECT similar_photo.id, similar_photo.full_url, similar_photo.regular_url,
                 similar_photo.city, similar_photo.country, similar_user.username,
                 similar_user.fullname, similar_user.profile_url
          FROM photo AS similar_photo
          JOIN user_account AS similar_user ON similar_user.id = similar_photo.user_id
          WHERE similar_photo.id <> $1 AND similar_photo.topic_id = $2
          LIMIT 4
        `, [photo.id, photo.topic_id]);

        return {
          id: photo.id,
          urls: {
            full: formatPhotoUrl(photo.full_url, serverUrl),
            regular: formatPhotoUrl(photo.regular_url, serverUrl)
          },
          user: {
            username: photo.username,
            name: photo.fullname,
            profile: formatPhotoUrl(photo.profile_url, serverUrl)
          },
          location: { city: photo.city, country: photo.country },
          similar_photos: similarResult.rows.map(s => ({
            id: s.id,
            urls: {
              full: formatPhotoUrl(s.full_url, serverUrl),
              regular: formatPhotoUrl(s.regular_url, serverUrl)
            },
            user: {
              username: s.username,
              name: s.fullname,
              profile: formatPhotoUrl(s.profile_url, serverUrl)
            },
            location: { city: s.city, country: s.country }
          }))
        };
      }));

      res.json(photosWithSimilar);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  });

  return router;
};