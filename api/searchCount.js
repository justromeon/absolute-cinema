import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed'});
  }
  const { movie_id, poster_url } = req.body;

  if (!movie_id) {
    return res.status(400).json({message: 'movie_id is required'});
  }

  try {
    const { rows } = await sql `
      SELECT movie_id, count
      FROM search_counts
      WHERE movie_id = ${movie_id}
      `;

    if (rows.length > 0) {
      const currentCount = rows[0].count;
      await sql `
        UPDATE search_counts
        SET count = ${currentCount + 1}
        WHERE movie_id = ${movie_id}
      `;
      return res.status(200).json({message: 'Movie count updated successfully'})

    } else {
      
      await sql `
        INSERT INTO search_counts (movie_id, count, poster_url)
        VALUES (${movie_id}, 1, ${poster_url})
      `;
      return res.status(201).json({message: 'New movie added successfully'});
      
    }

  } catch (error) {
    console.log(`Error in searchCount API: ${error}`);
    return res.status(500).json({message: 'Internal server error'});
  }

}