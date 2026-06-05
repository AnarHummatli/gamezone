import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import whiteBg from '../assets/white-bg.svg';
import '../styles/details.css';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`https://www.freetogame.com/api/game?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Game details not found');
        return res.json();
      })
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading-box">Loading game details...</div>;
  }
  if (!game) {
    return null;
  }

  return (
    <main className="details-main">
      <div className="details-container">

        <Link to="/" className="back-btn">← Back to Directory</Link>

        <section className="game-header-section">
          <div className="game-hero-image-wrapper">
            <img
              src={game.thumbnail}
              alt={game.title}
              className="game-main-img" 
              onError={(e) => { e.target.src = {whiteBg}; }}
              />
          </div>

          <div className="game-header-info">
            <h1>{game.title}</h1>
            <span className="badge-genre">{game.genre}</span>
            <span className="badge-platform">
              {game.platform.toLowerCase() === 'windows' ? 'PC (Windows)' : game.platform}
            </span>

            <div className="quick-meta">
              <p><strong>Publisher:</strong> {game.publisher}</p>
              <p><strong>Developer:</strong> {game.developer}</p>
              <p><strong>Release Date:</strong> {game.release_date}</p>
            </div>

            <a href={game.game_url} target="_blank" className="play-now-btn">
              Play Now 🚀
            </a>
          </div>
        </section>

        <section className="game-description-section">
          <h2>About {game.title}</h2>
          <p>{game.description}</p>
        </section>

        {game.minimum_system_requirements && (
          <section className="requirements-section">
            <h2>Minimum System Requirements</h2>
            <div className="requirements-grid">
              <div className="req-item"><strong>OS:</strong> {game.minimum_system_requirements.os || 'N/A'}</div>
              <div className="req-item"><strong>Processor:</strong> {game.minimum_system_requirements.processor || 'N/A'}</div>
              <div className="req-item"><strong>Memory:</strong> {game.minimum_system_requirements.memory || 'N/A'}</div>
              <div className="req-item"><strong>Graphics:</strong> {game.minimum_system_requirements.graphics || 'N/A'}</div>
              <div className="req-item"><strong>Storage:</strong> {game.minimum_system_requirements.storage || 'N/A'}</div>
            </div>
          </section>
        )}

        {game.screenshots && game.screenshots.length > 0 && (
          <section className="screenshots-section">
            <h2>Screenshots</h2>
            <div className="screenshots-grid">
              {game.screenshots.map((screen) => (
                <img key={screen.id} src={screen.image} alt="Gameplay" className="screenshot-img" />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default GameDetails;