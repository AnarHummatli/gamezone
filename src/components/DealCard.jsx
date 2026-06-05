import { useState } from 'react';
import { useLibrary } from '../context/LibraryContext'; // Context-i import edirik
import whiteBg from '../assets/white-bg.svg';
import '../styles/deals.css';

const storeMap = {
  '1': 'Steam',
  '2': 'GamersGate',
  '3': 'GreenManGaming',
  '7': 'GOG',
  '11': 'Humble Store',
  '25': 'Epic Games'
};

function DealCard({ game }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDeal = game.deals[activeIndex];

  const originalPrice = parseFloat(activeDeal.normalPrice).toFixed(2);
  const salePrice = parseFloat(activeDeal.salePrice).toFixed(2);
  const savings = Math.round(parseFloat(activeDeal.savings));

  const { addToLibrary, removeFromLibrary, isInLibrary } = useLibrary();

  const gameId = game.title;
  const isSaved = isInLibrary(gameId);

  const handleLibraryToggle = () => {
    if (isSaved) {
      removeFromLibrary(gameId);
    } else {
      addToLibrary({
        id: gameId,
        title: game.title,
        thumb: game.thumb,
        type: 'deal',
        price: salePrice,
        originalPrice: originalPrice
      });
    }
  };

  return (
    <article className="deal-card">
      <div className="deal-image-wrapper">
        <img
          src={game.thumb}
          alt={game.title}
          className="deal-image"
          onError={(e) => { e.target.src = whiteBg; }}
        />
        {savings > 0 && (
          <span className="deal-badge">-{savings}%</span>
        )}
      </div>

      <div className="deal-content">
        <h3 className="deal-title" title={game.title}>{game.title}</h3>

        <div className="store-selector">
          {game.deals.map((deal, index) => (
            <button
              key={deal.dealID}
              className={`store-pill ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {storeMap[deal.storeID] || 'Store'}
            </button>
          ))}
        </div>

        <div className="deal-prices">
          <span className="price-sale">${salePrice}</span>
          <span className="price-original">${originalPrice}</span>
        </div>

        <div className="deal-card-actions">
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${activeDeal.dealID}`}
            target="_blank"
            className="btn-view"
          >
            View Deal 🛒
          </a>

          <button
            onClick={handleLibraryToggle}
            className={`btn-add ${isSaved ? 'saved' : ''}`}
          >
            {isSaved ? 'Remove ❌' : '+ Add To Library'}
          </button>
        </div>

      </div>
    </article>
  );
}

export default DealCard;