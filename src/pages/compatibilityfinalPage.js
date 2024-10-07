import React from 'react';
import CompatibilityPage from './CompatibilidadePage'; // Importa o componente CompatibilityPage
import EcosystemPage from './aboutUS';
import './afterCompatibility.css';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const { compatibilityValue } = location.state || {}; // Recebe o valor do estado passado pela navegação

  // Função para rolar suavemente até a EcosystemPage
  const scrollToEcosystem = () => {
    const ecosystemSection = document.getElementById('ecosystem-section');
    ecosystemSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="main-page-container">
      <main>
        {/* Exibe a CompatibilityPage */}
        <CompatibilityPage compatibilityValue={compatibilityValue} />
        
        {/* Seta para indicar que há mais conteúdo abaixo */}
        <div className="scroll-indicator" onClick={scrollToEcosystem}>
          ⬇️ {/* A seta, que ao ser clicada rola a página */}
        </div>
        
        {/* Seção da EcosystemPage */}
        <div id="ecosystem-section">
          <EcosystemPage />
        </div>
      </main>
      
      <footer>
        <p>© 2024 DNA Club. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default MainPage;
