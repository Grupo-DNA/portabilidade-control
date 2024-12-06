import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import meninaCelular from '../assets/meninaCelular.png';
import './avancoPortabilidade.css';



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
          <h1>Parabéns, basta esperar que te retornaremos com todos os seus laudos</h1>

        </div>
      </div>
    </div>
  );
};

export default MultiplaPort;
