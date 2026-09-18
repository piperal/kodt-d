
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Task Tracker</h1>

            <nav>
                <NavLink to="/">Home</NavLink>{' '}
                <NavLink to="/tasks">Tasks</NavLink>
            </nav>
        </header>
    );
}

export default Header;

