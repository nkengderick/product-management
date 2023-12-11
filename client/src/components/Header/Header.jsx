import './header.css'
import logo from '../../Assets/brand.png'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className='Header'>
            <Link to='/' className='brand'>
                <img src={logo} alt="brand logo" />
            </Link>
                <div className='hamburger-icon' onClick={toggleMenu}>
                    &#9776;
                </div>
            <div className='nav-links'>
                <ul className={showMenu ? 'show' : 'noshow'}>
                    <li><Link to='/products' onClick={toggleMenu}>Products</Link></li>
                    <li><Link to='/add-product' onClick={toggleMenu}>Add a Product</Link></li>
                    <li><Link to='/categories' onClick={toggleMenu}>Explore Categories</Link></li>
                    <li><Link to='/inventories' onClick={toggleMenu}>Track Inventories</Link></li>
                    <li><Link to='/report' onClick={toggleMenu}>Report</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
