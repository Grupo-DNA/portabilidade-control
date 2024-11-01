import React from 'react';
import arcoROXO from '../assets/arcoDnaRoxo.png';
import './compatibilidade.css';
import ScrollArrow from '../components/setaScroll';

const CompatibilityPage = ({ compatibilityValue }) => {
  const numericCompatibilityValue = Number(compatibilityValue);
  const roundedCompatibilityValue = Math.round(numericCompatibilityValue);
  const compatibilityValue2cases = numericCompatibilityValue.toFixed(2);

  return (
    <div className="compatibility-container">
      <h1>BEM VINDO A DNA CLUB</h1>
      <div className="image-container">
        <img src={arcoROXO} alt="Compatibilidade" />
        <h2>{roundedCompatibilityValue}%</h2> {/* H2 dentro da imagem */}
      </div>
      <div className='text-section-compatibility'>
        <p>Seus dados genéticos têm <b>{compatibilityValue2cases}% de compatibilidade</b> com as informações da <b>DNA Club.</b></p>
        <p>Seu <b>laudo já está sendo preparado</b> e você receberá um <b>e-mail com o acesso</b></p>
      </div>
      <ScrollArrow targetId="ecosystem-section" />
    </div>
  );
};

export default CompatibilityPage;
