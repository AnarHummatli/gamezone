import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import whiteBg from '../assets/white-bg.svg';
import '../styles/directory.css';

function GameCard({ game }) {
    const { addToLibrary, removeFromLibrary, isInLibrary } = useLibrary();
    const isSaved = isInLibrary(game.id);

    const handleLibraryToggle = () => {
        if (isSaved) {
            removeFromLibrary(game.id);
        } else {
            addToLibrary({
                id: game.id,
                title: game.title,
                thumb: game.thumbnail,
                platform: game.platform
            });
        }
    };

    return (
        <article className="game-card">
            <div className="card-image-wrapper">
                <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="game-image"
                    onError={(e) => { e.target.src = whiteBg; }}
                />
            </div>

            <div className="card-content">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-platform">{game.platform}</span>
                <p className="game-description">{game.short_description}</p>
                <div className="card-actions">
                    <Link to={`/game/${game.id}`} className="btn-details">
                        View Details
                    </Link>
                    <button
                        className={`btn-add ${isSaved ? 'saved' : ''}`}
                        onClick={handleLibraryToggle}
                    >
                        {isSaved ? 'Remove From Library ❌' : '+ Add To Library'}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default GameCard;