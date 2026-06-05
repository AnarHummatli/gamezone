import { useState, useEffect, useMemo } from 'react';
import DealCard from '../components/DealCard';
import '../styles/deals.css';

function GameDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [storeFilter, setStoreFilter] = useState('All');
  const [sortFilter, setSortFilter] = useState('Default');

  const mainStores = ['1', '2', '3', '7', '11', '25'];

  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch deals');
        return res.json();
      })
      .then((data) => {
        const grouped = data.reduce((acc, current) => {
          if (!acc[current.title]) {
            acc[current.title] = {
              title: current.title,
              thumb: current.thumb,
              deals: []
            };
          }
          acc[current.title].deals.push(current);
          return acc;
        }, {});

        const sortedGrouped = Object.values(grouped).map(game => {
          game.deals.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice));
          return game;
        });

        setDeals(sortedGrouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedDeals = useMemo(() => {
    let result = [...deals];

    if (storeFilter === 'Other') {
      result = result.filter(game => 
        game.deals.some(deal => !mainStores.includes(deal.storeID))
      );
    } else if (storeFilter !== 'All') {
      result = result.filter(game => 
        game.deals.some(deal => deal.storeID === storeFilter)
      );
    }

    if (sortFilter === 'Highest') {
      result.sort((a, b) => {
        const maxSavingsA = Math.max(...a.deals.map(d => parseFloat(d.savings)));
        const maxSavingsB = Math.max(...b.deals.map(d => parseFloat(d.savings)));
        return maxSavingsB - maxSavingsA;
      });
    } else if (sortFilter === 'Lowest') {
      result.sort((a, b) => {
        const maxSavingsA = Math.max(...a.deals.map(d => parseFloat(d.savings)));
        const maxSavingsB = Math.max(...b.deals.map(d => parseFloat(d.savings)));
        return maxSavingsA - maxSavingsB;
      });
    }

    return result;
  }, [deals, storeFilter, sortFilter]);

  const handleStoreChange = (e) => {
    setStoreFilter(e.target.value);
    setVisibleCount(12);
  };

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  if (loading) {
    return <div className="deals-loading">Searching for the best deals... 🔍</div>;
  }

  return (
    <main className="deals-main">
      <section className="deals-hero">
        <h1>HOTTEST GAMING DEALS</h1>
        <p>Catch the best discounts on popular PC games live from the top stores. Don't miss out!</p>
      </section>

      <section className="deals-filters-section">
        <div className="filters-wrapper">
          <div className="filter-group">
            <label htmlFor="store-select">Store</label>
            <div className="select-custom-wrapper">
              <select id="store-select" value={storeFilter} onChange={handleStoreChange}>
                <option value="All">All Stores</option>
                <option value="1">Steam</option>
                <option value="2">GamersGate</option>
                <option value="3">GreenManGaming</option>
                <option value="7">GOG</option>
                <option value="11">Humble Store</option>
                <option value="25">Epic Games</option>
                <option value="Other">Other Stores</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select">Sort By</label>
            <div className="select-custom-wrapper">
              <select id="sort-select" value={sortFilter} onChange={handleSortChange}>
                <option value="Default">Default</option>
                <option value="Highest">Highest Discount</option>
                <option value="Lowest">Lowest Discount</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="deals-grid-section">
        <div className="deals-container">
          {filteredAndSortedDeals.length > 0 ? (
            filteredAndSortedDeals.slice(0, visibleCount).map((game) => (
              <DealCard key={game.title} game={game} />
            ))
          ) : (
            <p className="no-deals-msg">No deals found for the selected criteria.</p>
          )}
        </div>
      </section>

      {filteredAndSortedDeals.length > visibleCount && (
        <div className="load-more-container">
          <button className="btn-load-more" onClick={handleLoadMore}>
            Show More Deals
          </button>
        </div>
      )}
    </main>
  );
}

export default GameDeals;