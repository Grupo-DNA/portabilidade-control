import React from 'react';
import CompatibilityPage from './CompatibilidadePage';
import ContactUs from './ContactUS'
import EcosystemPage from './aboutUS';
import './afterCompatibility.css';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const { compatibilityValue } = location.state || {};

  const scrollToEcosystem = () => {
    const ecosystemSection = document.getElementById('ecosystem-section');
    ecosystemSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="main-page-container">
      <main>
        <CompatibilityPage compatibilityValue={compatibilityValue} />             
        <div id="ecosystem-section">
          <EcosystemPage />
        </div>
        <div id='contact-us'>
          <ContactUs />
        </div>
      </main>

    </div>
  );
};

export default MainPage;
