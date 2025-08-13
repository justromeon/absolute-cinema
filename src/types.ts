export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  original_language: string;
}

export interface TrendingMovie {
  movie_id: number;
  title: string;
  poster_url: string | null;
}