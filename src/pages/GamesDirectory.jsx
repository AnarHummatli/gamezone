import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import '../styles/directory.css';

function GamesDirectory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('https://www.freetogame.com/api/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="directory-main">
      <section className="hero-section">
        <h1>LEVEL UP YOUR GAMING WITHOUT SPENDING A DIME</h1>
        <p>Browse and discover free-to-play games for PC and Web. Search for your favorite titles and save them to your personal library.</p>
      </section>

      <section className="games-grid-section">
        <div className="games-container">
          {games.slice(0, 12).map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default GamesDirectory;