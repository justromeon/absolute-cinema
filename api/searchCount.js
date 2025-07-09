import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.warn(`[searchCount API] Method Not Allowed: ${req.method}`);
    return res.status(405).json({success: false, message: 'Method not allowed'});
  }

  const { movie_id, poster_url } = req.body;

  if (!movie_id) {
    console.warn(`[searchCount API] Bad request: movie_id is required`)
    return res.status(400).json({success: false, message: 'movie_id is required'});
  }

  try {
    const { rows } = await sql `
      SELECT movie_id, count
      FROM search_counts
      WHERE movie_id = ${movie_id}
    `;
    
    const isMovieFound = rows.length > 0;
    const currentCount = rows[0].count;

    if (isMovieFound) {
      await sql `
        UPDATE search_counts
        SET count = ${currentCount + 1}
        WHERE movie_id = ${movie_id}
      `;

    } else {      
      await sql `
        INSERT INTO search_counts (movie_id, count, poster_url)
        VALUES (${movie_id}, 1, ${poster_url})
      `;
      
    }

    const statusCode = isMovieFound ? 200 : 201;
    const resultMessage = isMovieFound ? 'Movie count updated successfully' : 'New movie added successfully';
    return res.status(statusCode).json({success: true, message: resultMessage});

  } catch (error) {
    console.error(`[searchCount API] Database error for movie_id ${movie_id}:`, error);
    return res.status(500).json({message: 'Internal server error'});
  }

}