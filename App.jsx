import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WatchListProvider } from './context/WatchListContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <WatchListProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WatchListProvider>
  );
}

export default App;