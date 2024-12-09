import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import meninaCelular from '../assets/meninaCelular.png';
import './multiplaPort.css';



const MultiplaPort = () => {
  const location = useLocation();
  const { orderData, quantidadeDocumentos } = location.state || {}; // Recebe os dados do estado

  return (
    <div className="main-container">
      <div className="media-content">
        <div className="info-secion">
          <InfoSection />
        </div>
        <div className="img-forms">
          <img src={meninaCelular} alt="menina no celular" className="form-image" />
        </div>
      </div>

      <div className="container">
        <div className="upload-container">
          <div className="texto_concluido">
            <h1>OBRIGADO</h1>
            <h2>por adquirir a multiportabilidade!</h2> 
            <p> Seus dados estão sendo processados e você será notificado assim que estiverem disponíveis.</p>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default MultiplaPort;
