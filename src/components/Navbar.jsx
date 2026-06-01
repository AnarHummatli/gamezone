import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
    return (
        <header className="navbar-header">
            <div className="logo">🎮 GameZone</div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/deals">Deals</Link></li>
                    <li><Link to="/library">My Library</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;