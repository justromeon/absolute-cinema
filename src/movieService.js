
export const updateMovieSeachCount = async (movie) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';

    try {
      const response = await fetch('api/searchCount', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( {movie_id: movie.id, poster_url: posterUrl} )
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update movie search count');
      }
      return await response.json();

    } catch (error) {
      console.log(`Error updating movie search count: ${error}`);
      throw error;
    }

}

export const getTrendingMovies = async () => {
  try {
    const response = await fetch('/api/trending');

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch trending movies');
    }
    return await response.json();

  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
}