import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { WatchListContext } from '../context/WatchListContext';

const MovieCard = ({ movie }) => {
  const { toggleWatchlist, watchlist } = useContext(WatchListContext);
  const inWatchList = watchlist.some(m => m.id === movie.id);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      ':hover': {
        transform: 'scale(1.03)'
      }
    }}>
      <div style={{ position: 'relative' }}>
        <Link to={`/movie/${movie.id}`}>
          <img 
            src={
              movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            } 
            alt={movie.title}
            style={{
              width: '100%',
              height: '350px',
              objectFit: 'cover'
            }}
          />
        </Link>
        <button 
          onClick={() => toggleWatchlist(movie)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            color: inWatchList ? '#f43f5e' : 'white'
          }}
        >
          {inWatchList ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      
      <div style={{ padding: '1rem' }}>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{
            margin: '0',
            fontSize: '1.1rem',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {movie.title}
          </h3>
        </Link>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
          color: '#64748b'
        }}>
          <span>{movie.release_date?.substring(0, 4) || 'N/A'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <FaStar style={{ color: '#fbbf24' }} />
            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;