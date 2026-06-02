import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {

    const libraryCount = 3;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="navbar-logo">🎮 GameZone</span>

                <div className="navbar-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/deals" className="nav-item">Deals</Link>
                    <Link to="/library" className="nav-item">My Library ({libraryCount})</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;