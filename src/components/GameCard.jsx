function GameCard({ game }) {
    return (
        <article className="game-card">

            <div className="card-image-wrapper">
                <img src={game.thumbnail} alt={game.title} className="game-image" />
            </div>

            <div className="card-content">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-platform">{game.platform}</span>
                <p className="game-description">{game.short_description}</p>
                <div className="card-actions">
                    <button className="btn-details">View Details</button>
                    <button className="btn-add">+ Add To Library</button>
                </div>
            </div>

        </article>
    );
}

export default GameCard;