import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GamesDirectory from './pages/GamesDirectory';
import GameDetails from './pages/GameDetails';
import GameDeals from './pages/GameDeals';
import MyLibrary from './pages/MyLibrary';

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<GamesDirectory />} />
          <Route path="/deals" element={<GameDeals />} />
          <Route path="/library" element={<MyLibrary />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;