import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WatchListContext } from '../context/WatchListContext';

const Navbar = () => {
  const { watchlist } = useContext(WatchListContext);

  return (
    <nav style={{
      backgroundColor: '#0f172a',
      padding: '0.8rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      {/* Logo */}
      <Link to="/" style={{
        textDecoration: 'none',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '0.5px',
      }}>
        <span style={{ fontSize: '1.8rem', marginRight: '0.4rem' }}>🎬</span>
        <span style={{
          background: 'linear-gradient(90deg, #f43f5e, #f59e0b)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          MovieDB
        </span>
      </Link>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        marginRight: '1rem'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: '600',
          padding: '0.5rem 0.8rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        }}>
          Home
        </Link>

        <Link to="/watchlist" style={{
          textDecoration: 'none',
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(244, 63, 94, 0.2)',
          transition: 'all 0.3s ease',
        }}>
          Watchlist 
          <span style={{
            backgroundColor: '#f43f5e',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: '700',
            boxShadow: '0 2px 4px rgba(244, 63, 94, 0.3)'
          }}>
            {watchlist.length}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
