import React from 'react';
import CompatibilityPage from './CompatibilidadePage';
import EcosystemPage from './aboutUS';
import './afterCompatibility.css';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const { compatibilityValue } = location.state || {};

  //chamada da api para gerar laudo ( passar nome e email na url.)

  const scrollToEcosystem = () => {
    const ecosystemSection = document.getElementById('ecosystem-section');
    ecosystemSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="main-page-container">
      <main>
        {/* Exibe a CompatibilityPage */}
        <CompatibilityPage compatibilityValue={compatibilityValue} />
                
        {/* Seção da EcosystemPage */}
        <div id="ecosystem-section">
          <EcosystemPage />
        </div>
      </main>

    </div>
  );
};

export default MainPage;
