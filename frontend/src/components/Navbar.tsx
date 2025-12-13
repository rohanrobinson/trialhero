import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/" className="nav-logo">
                    Trial Hero
                </NavLink>
            </div>
            <div className="navbar-links">
                <NavLink
                    to="/visual"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Visual Body Search
                </NavLink>
                <NavLink
                   to="/profile"
                   className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                   Profile
                </NavLink>
                <NavLink
                    to="/bookmarks"
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                    Bookmarks
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
