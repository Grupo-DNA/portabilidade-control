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
        
        <p>Seu laudo <b>está sendo gerado</b> e, em breve, estará disponível em sua conta em nosso site. Caso ainda não tenha uma conta, solicitamos que crie uma utilizando o mesmo e-mail da compra para acessá-lo.</p>
        <button className="btn secondary-btn"     onClick={() => window.open('https://www.dnaclub.com.br/account/login', 
                  '_blank')} >Entrar no site</button>
        <p> <b>Possui mais laudos para gerar com esta compra? </b>Entre em contato conosco pelo WhatsApp e te ajudamos!</p>
        <button className="btn secondary-btn"     onClick={() => window.open('https://api.whatsapp.com/send?phone=5516981954580&text=Ol%C3%A1!%20Vim%20pelo%20Portal%20de%20portabilidades.%20Gostaria%20de%20atendimento.', 
                  '_blank')} >Entrar em contato</button>
      </div>
      <ScrollArrow targetId="ecosystem-section" />
    </div>
  );
};

export default CompatibilityPage;
