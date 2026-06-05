import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import '../styles/navbar.css';

function Navbar() {
    const { library } = useLibrary();

    const libraryCount = library.length;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="navbar-logo">🎮 GameZone</span>

                <div className="navbar-links">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/deals" className="nav-item">Deals</Link>
                    <Link to="/library" className="nav-item">
                        My Library {libraryCount > 0 ? `(${libraryCount})` : ''}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;