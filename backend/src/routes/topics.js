const router = require("express").Router();

module.exports = db => {
  const getServerUrl = (req) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}`;
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
  
  router.get("/topics/:id/photos", (request, response) => {
    const serverUrl = getServerUrl(request);
    const imageBase = `${serverUrl}/images/`;

    db.query(`
    SELECT 
      json_agg(
          json_build_object(
          'id', photo.id,
          'urls', json_build_object(
            'full', CASE WHEN photo.full_url LIKE 'http%' THEN photo.full_url ELSE concat($2, photo.full_url) END,
            'regular', CASE WHEN photo.regular_url LIKE 'http%' THEN photo.regular_url ELSE concat($2, photo.regular_url) END
          ),
          'user', json_build_object(
            'username', user_account.username,
            'name', user_account.fullname,
            'profile', CASE WHEN user_account.profile_url LIKE 'http%' THEN user_account.profile_url ELSE concat($2, user_account.profile_url) END
          ),
          'location', json_build_object(
            'city', photo.city,
            'country', photo.country
          ),
          'similar_photos', (
            SELECT 
              json_agg(
                json_build_object(
                  'id', similar_photo.id,
                  'urls', json_build_object(
                    'full', CASE WHEN similar_photo.full_url LIKE 'http%' THEN similar_photo.full_url ELSE concat($2, similar_photo.full_url) END,
                    'regular', CASE WHEN similar_photo.regular_url LIKE 'http%' THEN similar_photo.regular_url ELSE concat($2, similar_photo.regular_url) END
                  ),
                  'user', json_build_object(
                    'username', similar_user_account.username,
                    'name', similar_user_account.fullname,
                    'profile', CASE WHEN similar_user_account.profile_url LIKE 'http%' THEN similar_user_account.profile_url ELSE concat($2, similar_user_account.profile_url) END
                  ),
                  'location', json_build_object(
                    'city', similar_photo.city,
                    'country', similar_photo.country
                  )
                )
              )
            FROM photo AS similar_photo
            JOIN user_account AS similar_user_account ON similar_user_account.id = similar_photo.user_id
            WHERE similar_photo.id <> photo.id
            AND similar_photo.topic_id = photo.topic_id
            LIMIT 4
          )
        )
      ) as topic_photo_data
      FROM topic
      JOIN photo ON photo.topic_id = topic.id
      JOIN user_account ON user_account.id = photo.user_id
      WHERE topic.id = $1
    `, [request.params.id, imageBase]).then(({ rows }) => {
      response.json(rows[0].topic_photo_data);
    });
  });

  return router;
};