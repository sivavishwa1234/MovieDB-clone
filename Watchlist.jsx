import { useState, useContext } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import { WatchListContext } from '../context/WatchListContext';

const Watchlist = () => {
  const { watchlist, genreList } = useContext(WatchListContext);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const filteredMovies = watchlist.filter(movie => 
    movie.title.toLowerCase().includes(search.toLowerCase()) &&
    (!selectedGenre || movie.genre_ids?.includes(Number(selectedGenre)))
  );

  return (
    <div style={{ padding: '1rem', paddingTop: '120px' }}>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        marginTop: '80px',
        gap: '1rem'
      }}>
        <GenreFilter 
          genreList={genreList} 
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#64748b'
        }}>
          {watchlist.length === 0 
            ? 'Your watchlist is empty. Add some movies!' 
            : 'No movies match your filters.'}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;