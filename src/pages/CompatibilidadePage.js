import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import arcoROXO from '../assets/arcoDnaRoxo.png';
import './compatibilidade.css'

const CompatibilityPage = () => {
  const location = useLocation();
  const { compatibilityValue } = location.state || {}; // Recebe o valor de compatibilidade vindo da página de loading
  const roundedCompatibilityValue = Math.round(compatibilityValue);
  return (
    <div className="compatibility-container">
      <h1>BEM VINDO A DNA CLUB</h1>
      <div className="image-container">
        <img src={arcoROXO} alt="Compatibilidade"/>
        <h2>{roundedCompatibilityValue}%</h2> {/* H2 dentro da imagem */}
      </div>
        <p>Seus dados genéticos têm <b>{compatibilityValue}% de compatibilidade </b> com as informações da <b>DNA Club.</b> </p>
        <p>Seu <b>laudo já está disponível </b> e você receberá um <b> e-mail com o acesso</b></p>

      <p>Se tiver dúvidas ou precisar de assistência, entre em contato conosco clicando <a href="/contato">AQUI</a></p>
    </div>
  );
};

export default CompatibilityPage;
