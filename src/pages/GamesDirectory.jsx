import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import '../styles/directory.css';

function GamesDirectory() {
  const [games, setGames] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  const filteredGames = games.filter(game => {
    const updatedSearch = searchText.trim().toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(updatedSearch);

    const matchesPlatform = platformFilter === 'all' || game.platform.toLowerCase().includes(platformFilter)
    return matchesSearch && matchesPlatform;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    if (sortBy === 'az') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  return (
    <main className="directory-main">

      <section className="hero-section">
        <h1>LEVEL UP YOUR GAMING WITHOUT SPENDING A DIME</h1>
        <p>Browse and discover free-to-play games for PC and Web. Search for your favorite titles and save them to your personal library.</p>
      </section>

      <section className="filter-panel">

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a game..."
            className="search-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setVisibleCount(12);
            }}
          />
        </div>

        <div className="filter-box">
          <label>Filter: </label>
          <select
            className="panel-select"
            value={platformFilter}
            onChange={(e) => {
              setPlatformFilter(e.target.value);
              setVisibleCount(12);
            }}
          >
            <option value="all">All Platforms</option>
            <option value="pc">PC (Windows)</option>
            <option value="browser">Web Browser</option>

          </select>
        </div>

        <div className="sort-box">
          <label>Sort: </label>
          <select
            className="panel-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setVisibleCount(12);
            }}
          >
            <option value="default">Default</option>
            <option value="az">Name (A-Z)</option>
            <option value="za">Name (Z-A)</option>
          </select>
        </div>

      </section>

      <section className="games-grid-section">
        <div className="games-container">
          {sortedGames.slice(0, visibleCount).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {sortedGames.length > visibleCount && (
        <div className="load-more-container">
          <button className="btn-load-more" onClick={handleLoadMore}>
            Show More Games
          </button>
        </div>
      )}

    </main>
  );
}

export default GamesDirectory;