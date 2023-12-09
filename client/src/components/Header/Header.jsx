import './header.css'
import logo from '../../Assets/brand.png'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='Header'>
        <Link to='/' className='brand'>
            <img src={logo} alt="brand logo" />
        </Link>
        <nav className='nav-links'>
            <Link to='/products'>Products</Link>
            <Link to='/add-product'>Add a Product</Link>
            <Link to='/categories'>Explore Categories</Link>
            <Link to='/inventories'>Track Inventories</Link>
            <Link to='/report'>Report</Link>
        </nav>
    </div>
  )
}

export default Header
