import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import logoClub from '../assets/Club.BRANCO.png';
import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoClub} alt="Grupo DNA" />
        </div>
        <div className="footer-info">
          <p>(16) 98195-4580 | (16) 3415-6869</p>
        </div>
        <div className="footer-social">
          <a href="https://instagram.https://www.instagram.com/clubdodna_/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
