const SearchBar = ({ value, onChange }) => (
  <div style={{
    position: 'fixed',
    top: '72px', // Just below navbar (which is 70px + padding)
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 999,
    width: '90%',
    maxWidth: '600px',
    padding: '0.5rem',
  }}>
    <input 
      type="text" 
      placeholder="Search movies..."
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '0.9rem 1.2rem',
        borderRadius: '50px',
        border: '1px solid #e5e7eb',
        outline: 'none',
        fontSize: '1rem',
        backgroundColor: '#fff',
        color: '#111827',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease',
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.3)';
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }}
    />
  </div>
);

export default SearchBar;
