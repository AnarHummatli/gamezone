import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import '../styles/library.css';

function MyLibrary() {
  const { library, removeFromLibrary } = useLibrary();

  const freeGames = library.filter((game) => game.type !== 'deal');
  const savedDeals = library.filter((game) => game.type === 'deal');

  const totalCost = savedDeals.reduce((sum, game) => sum + parseFloat(game.price), 0).toFixed(2);

  return (
    <main className="library-main">
      <section className="library-hero">
        <h1>MY LIBRARY</h1>
        <p>All your favorite and saved games in one place.</p>
      </section>

      {library.length === 0 ? (
        <div className="empty-library">
          <h2>Your library is currently empty 😢</h2>
          <p>
            Browse the <Link to="/">Catalog</Link> or check out <Link to="/deals">Deals</Link> to find some games.
          </p>
        </div>
      ) : (
        <>
          {freeGames.length > 0 && (
            <section className="library-category">
              <h2 className="category-title">Free-to-Play Games ({freeGames.length})</h2>
              <div className="library-grid-section">
                <div className="library-container">
                  {freeGames.map((game) => (
                    <article key={game.id} className="library-card">
                      <div className="library-image-wrapper">
                        <img src={game.thumb} alt={game.title} className="library-image" />
                      </div>
                      <div className="library-content">
                        <h3 className="library-title" title={game.title}>{game.title}</h3>
                        <button className="btn-remove" onClick={() => removeFromLibrary(game.id)}>
                          Remove ❌
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {freeGames.length > 0 && savedDeals.length > 0 && <hr className="library-divider" />}

          {savedDeals.length > 0 && (
            <section className="library-category">
              <div className="category-header">
                <h2 className="category-title">Wishlisted Deals ({savedDeals.length})</h2>
                <div className="total-cost-badge">
                  Total Value: <span>${totalCost}</span>
                </div>
              </div>
              <div className="library-grid-section">
                <div className="library-container">
                  {savedDeals.map((game) => (
                    <article key={game.id} className="library-card">
                      <div className="library-image-wrapper">
                        <img src={game.thumb} alt={game.title} className="library-image" />
                        <span className="library-price-badge">${game.price}</span>
                      </div>
                      <div className="library-content">
                        <h3 className="library-title" title={game.title}>{game.title}</h3>
                        <button className="btn-remove" onClick={() => removeFromLibrary(game.id)}>
                          Remove ❌
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default MyLibrary;