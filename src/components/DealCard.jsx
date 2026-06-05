import { useState } from 'react';
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

        <a 
          href={`https://www.cheapshark.com/redirect?dealID=${activeDeal.dealID}`} 
          target="_blank" 
          className="btn-buy"
        >
          View Deal 🛒
        </a>
      </div>
    </article>
  );
}

export default DealCard;