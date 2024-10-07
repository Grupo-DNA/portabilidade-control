import React from 'react';
import './errorPage.css';
import sadFace from '../assets/sadFace.png';
import dnaClubLogo from '../assets/Club.BRANCO.png';

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-content">
        <h1>PORTABILIDADE NÃO EFETUADA</h1>
        <img src={sadFace} alt="Sad Face" className="error-icon" />
        <p>
          Desculpe, sua <strong>portabilidade não pôde ser concluída</strong> devido a um erro interno.
          <br />
          Estamos aprimorando nosso sistema para evitar esses problemas no futuro.
          <br />
          Em breve, <strong>você receberá um e-mail com detalhes e orientações sobre os próximos passos.</strong>
          <br />
          Agradecemos sua paciência e compreensão.
        </p>
      </div>
      <img src={dnaClubLogo} alt="DNA Club Logo" className="dna-club-logo" />
    </div>
  );
};

export default ErrorPage;
