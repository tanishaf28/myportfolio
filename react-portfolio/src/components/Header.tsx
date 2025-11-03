import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between">
                <div className="text-lg font-bold">My Portfolio</div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects" className="hover:text-gray-400">Projects</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-gray-400">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;