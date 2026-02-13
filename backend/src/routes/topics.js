const router = require("express").Router();

module.exports = db => {
  const getServerUrl = (req) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}`;
  };

  const formatUrl = (url, imageBase) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      return url;
    }
    return `${imageBase}${url}`;
  };

  router.get("/topics", (request, response) => {
    db.query(`
      SELECT 
      topic.id,
      topic.title,
      topic.slug
      FROM topic
    `).then(({ rows: topics }) => {
      response.json(topics);
    });
  });
  
  router.get("/topics/:id/photos", async (request, response) => {
    const serverUrl = getServerUrl(request);
    const imageBase = `${serverUrl}/images/`;

    try {
      const { rows } = await db.query(`
        SELECT photo.id, photo.full_url, photo.regular_url, photo.city,
               photo.country, photo.topic_id,
               user_account.username, user_account.fullname, user_account.profile_url
        FROM photo
        JOIN user_account ON user_account.id = photo.user_id
        WHERE photo.topic_id = $1
        ORDER BY photo.id
      `, [request.params.id]);

      const photos = await Promise.all(rows.map(async (photo) => {
        const similarResult = await db.query(`
          SELECT similar_photo.id, similar_photo.full_url, similar_photo.regular_url,
                 similar_photo.city, similar_photo.country,
                 similar_user.username, similar_user.fullname, similar_user.profile_url
          FROM photo AS similar_photo
          JOIN user_account AS similar_user ON similar_user.id = similar_photo.user_id
          WHERE similar_photo.id <> $1 AND similar_photo.topic_id = $2
          LIMIT 4
        `, [photo.id, photo.topic_id]);

        return {
          id: photo.id,
          urls: {
            full: formatUrl(photo.full_url, imageBase),
            regular: formatUrl(photo.regular_url, imageBase)
          },
          user: {
            username: photo.username,
            name: photo.fullname,
            profile: formatUrl(photo.profile_url, imageBase)
          },
          location: {
            city: photo.city,
            country: photo.country
          },
          similar_photos: similarResult.rows.map(s => ({
            id: s.id,
            urls: {
              full: formatUrl(s.full_url, imageBase),
              regular: formatUrl(s.regular_url, imageBase)
            },
            user: {
              username: s.username,
              name: s.fullname,
              profile: formatUrl(s.profile_url, imageBase)
            },
            location: {
              city: s.city,
              country: s.country
            }
          }))
        };
      }));

      response.json(photos);
    } catch (err) {
      console.error('Topic photos error:', err);
      response.status(500).json({ error: 'Failed to fetch topic photos' });
    }
  });

  return router;
};