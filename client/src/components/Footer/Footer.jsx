import './footer.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaPhone } from 'react-icons/fa' 

const Footer = () => {
  return (
    <div className='Footer'>
      <footer>
        <p className='copyright'>&copy; {new Date().getFullYear()} Your Company Name</p>
        <nav className='footer-links'>
          <Link className='footer-link' to="/terms">Terms & Conditions</Link>
          <Link className='footer-link' to="/privacy">Privacy Policy</Link>
        </nav> 
        <ul className='footer-icons'>
          <li className='footer-icon'>
            <Link className='footer-icon-link' to="https://www.facebook.com/your-page"><FaFacebook /></Link>
          </li>
          <li className='footer-icon'>
            <Link className='footer-icon-link' to="https://www.twitter.com/your-page"><FaTwitter /></Link>
          </li>
          <li className='footer-icon'>
            <Link className='footer-icon-link' to="mailto:contact@yourcompany.com"><FaPhone /></Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer