import React from 'react';
import iconeEspecialistas from '../assets/iconeEspe.png'
import iconeProdutos from '../assets/iconeProdutos.png'
import iconeAtendimento from '../assets/iconeAtendimento.png'
import ScrollArrow from '../components/setaScroll';
import './aboutUS.css';

const EcosystemPage = () => {
  return (
    <div className="ecosystem-container">
      <h1>CONHEÇA NOSSO ECOSSISTEMA</h1>
      <p>Agora você faz parte do mais completo ecossistema de saúde</p>
      
      <div className="ecosystem-section">
        <div className="ecosystem-item">
          <div className="icon-circle">
            <img src={iconeEspecialistas} alt="Rede de especialistas" />
          </div>
          <div className="ecosystem-item-content">
            <h2>Rede de especialistas</h2>
            <p>
              O nosso Ecossistema de Saúde conta com parceiros nutricionistas, 
              médicos, esteticistas e outros especialistas capacitados para 
              atendê-lo(a) de acordo com os resultados do seu laudo.
            </p>
          </div>
        </div>
        
        <div className="ecosystem-item reverse">
          <div className="icon-circle">
            <img src={iconeProdutos} alt="Produtos Ideais" />
          </div>
          <div className="ecosystem-item-content">
            <h2>Produtos Ideais</h2>
            <p>
              Fazemos uma seleção de produtos ideais para você. Desde 
              suplementações alimentares, vitaminas personalizadas, fármacos 
              e até cosméticos.
            </p>
          </div>
        </div>
        
        <div className="ecosystem-item">
          <div className="icon-circle">
            <img src={iconeAtendimento} alt="Atendimento pós-laudo" />
          </div>
          <div className="ecosystem-item-content">
            <h2>Atendimento pós-laudo</h2>
            <p>
              Após a realização de um mapeamento genético Club, você recebe uma 
              consulta gratuita com nossos especialistas para ajudá-lo(a) na 
              interpretação do seu laudo.
            </p>
          </div>
        </div>
        <ScrollArrow targetId="contact-us" />
      </div>
    </div>
    
  );
};

export default EcosystemPage;
