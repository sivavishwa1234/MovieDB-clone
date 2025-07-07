import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart, FaStar, FaPlay } from 'react-icons/fa';
import { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { watchlist, toggleWatchlist } = useContext(WatchListContext);
  const inWatchList = watchlist.some(m => m.id === Number(id));

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a256a6c7658081477c71982821e5b31b&append_to_response=videos`)
      .then(res => {
        if (!res.ok) throw new Error('Movie not found');
        return res.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      paddingTop: '60px'
    }}>
      <div style={{ fontSize: '1.5rem' }}>Loading movie details...</div>
    </div>
  );

  if (error) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      paddingTop: '80px',
      color: '#ef4444'
    }}>
      <h2>Error: {error}</h2>
      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#0f172a',
        color: 'white',
        borderRadius: '5px',
        textDecoration: 'none'
      }}>
        Go back to home
      </Link>
    </div>
  );

  if (!movie) return null;

  const trailer = movie.videos?.results?.find(vid => vid.type === 'Trailer');

  return (
    <div style={{ paddingTop: '60px' }}>
      {/* Backdrop */}
      <div style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        backgroundImage: movie.backdrop_path 
          ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(15, 23, 42, 1)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(15, 23, 42, 1))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <div style={{
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
            color: 'white',
            textDecoration: 'none',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '5px'
          }}>
            <FaArrowLeft /> Back to movies
          </Link>
          
          <h1 style={{
            color: 'white',
            fontSize: '2.5rem',
            margin: '0.5rem 0'
          }}>{movie.title}</h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FaStar style={{ color: '#fbbf24' }} />
              <span style={{ color: 'white' }}>{movie.vote_average?.toFixed(1)}/10</span>
            </div>
            <span style={{ color: '#e2e8f0' }}>{movie.runtime} min</span>
            <span style={{ color: '#e2e8f0' }}>{movie.release_date}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
            {movie.genres?.map(genre => (
              <span key={genre.id} style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                {genre.name}
              </span>
            ))}
          </div>
          
          <button 
            onClick={() => toggleWatchlist(movie)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: inWatchList ? '#f43f5e' : 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            {inWatchList ? <FaHeart /> : <FaRegHeart />}
            {inWatchList ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        color: '#e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Overview</h2>
            <p>{movie.overview || 'No overview available.'}</p>
            
            {trailer && (
              <div style={{ marginTop: '2rem' }}>
                <h2 style={{ color: 'white', marginBottom: '1rem' }}>Trailer</h2>
                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden'
                }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '10px'
                    }}
                  ></iframe>
                </div>
              </div>
            )}
          </div>
          
          <div style={{ width: '300px' }}>
            <img 
              src={
                movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              } 
              alt={movie.title}
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;