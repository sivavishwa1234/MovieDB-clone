import { createContext, useState, useEffect } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const localData = localStorage.getItem('watchlist');
    return localData ? JSON.parse(localData) : [];
  });
  
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    // Fetch genres
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a256a6c7658081477c71982821e5b31b')
      .then(res => res.json())
      .then(data => setGenreList(data.genres || []))
      .catch(err => console.error('Error fetching genres:', err));
  }, []);

  const toggleWatchlist = (movie) => {
    setWatchlist(prev => 
      prev.some(m => m.id === movie.id) 
        ? prev.filter(m => m.id !== movie.id) 
        : [...prev, movie]
    );
  };

  return (
    <WatchListContext.Provider value={{ watchlist, toggleWatchlist, genreList }}>
      {children}
    </WatchListContext.Provider>
  );
};