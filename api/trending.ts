  import { sql } from "@vercel/postgres";

  export default async function handler(req, res) {
    if (req.method !== 'GET') {
      console.warn(`[trending API] Method not allowed: ${req.method}`)
      return res.status(405).json({message: 'Method not allowed'});
    }

    try {
      const { rows } = await sql `
        SELECT movie_id, count, poster_url
        FROM search_counts
        ORDER BY count DESC
        LIMIT 5
      `;
      return res.status(200).json(rows);

    } catch (error) {
      console.error(`[trending API] Database error fetching trending movies:`, error);
      return res.status(500).json({success: false, message: 'Internal server error'});
    }

  }