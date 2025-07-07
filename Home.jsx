import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const API_KEY = 'a256a6c7658081477c71982821e5b31b'; // Your TMDB API key
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = search
          ? `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        // Limit to 30 movies
        const limitedMovies = data.results.slice(0, 30);
        setMovies(limitedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, search]);

  return (
    <div style={{ padding: '1rem', paddingTop: '120px' }}>
      <SearchBar value={search} onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }} />
      
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh'
        }}>
          <div style={{ fontSize: '1.5rem' }}>Loading movies...</div>
        </div>
      ) : movies.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#64748b'
        }}>
          No movies found. Try a different search.
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            marginTop: '2rem',
            marginBottom: '2rem'
          }}>
            <button
              disabled={page === 1 || loading}
              onClick={() => setPage(prev => prev - 1)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: page === 1 ? '#cbd5e1' : '#334155',
                color: 'white',
                borderRadius: '5px',
                border: 'none',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.7 : 1
              }}
            >
              Previous
            </button>
            <button
              disabled={loading || movies.length < 30} // Disable if we have less than 30 movies
              onClick={() => setPage(prev => prev + 1)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: movies.length < 30 ? '#cbd5e1' : '#334155',
                color: 'white',
                borderRadius: '5px',
                border: 'none',
                cursor: movies.length < 30 ? 'not-allowed' : 'pointer',
                opacity: movies.length < 30 ? 0.7 : 1
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;