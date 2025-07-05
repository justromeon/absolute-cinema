import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateMovieSeachCount } from "./movieService";

const API_BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [seachTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState('false');

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrMsg('');

    try {

      const endpoint = query
        ? `${API_BASE_URL}search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}discover/movie?sort_by=popularity.desc`


      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok) {
        throw new Error("Error fetching movies");
      }
      const data = await response.json();
      
      if(data.Response === 'False') {
        setErrMsg(data.Error || 'Failed to load movies.');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if(query && data.results.length > 0) {
        await updateMovieSeachCount(data.results[0]);
      }

    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrMsg('Failed loading movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }

  }

  const loadTrendingMovies = async () => {
    try {

      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`)
    }

  }

  useDebounce(() => setDebouncedSearch(seachTerm), 500, [seachTerm]);

  useEffect( () => {
    fetchMovies(debouncedSearch);
  }, [debouncedSearch]);

  useEffect( () => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Your Next Favorite <span className="text-gradient">Movie</span>, Hassle-free</h1>
          <Search seachTerm={seachTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map( (movie, index) =>
              <li key={movie.movie_id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url || 'no-movie.png'} alt={movie.title} />
              </li>)}
            </ul>

          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errMsg ? (
            <p className="text-red-500">{errMsg}</p>
          ) : (
            <ul>
              {movieList.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </section>
      </div>

    </main>
  )
}

export default App