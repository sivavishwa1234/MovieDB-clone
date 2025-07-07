const GenreFilter = ({ genreList, value, onChange }) => {
  return (
    <select 
      value={value}
      onChange={onChange}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        border: '1px solid #cbd5e1',
        backgroundColor: 'white',
        minWidth: '200px',
        cursor: 'pointer'
      }}
    >
      <option value="">All Genres</option>
      {genreList.map(genre => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter;