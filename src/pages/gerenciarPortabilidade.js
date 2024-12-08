import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import meninaCelular from '../assets/meninaCelular.png';
import './gerenciarPortabilidade.css';

const GerenciarPortabilidade = ({ state }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData || []; // Recebe os dados da encomenda do estado de navegação

  const handleContactSupport = () => {
    const quantidadeDocumentos = orderData.line_items?.[0]?.quantity || 0;
    navigate('/avancoPortabilidade', {state: { orderData, quantidadeDocumentos}}); // Redireciona para a página de suporte
  };


  const phoneNumber = "11983731261";
  const message = encodeURIComponent(`Olá, me chamo ${orderData.customer.first_name} e meu ID de compra é: ${orderData.order_number}. Gostaria de tirar minhas dúvidas sobre portabilidade.`);
  
  // Corrigido: Usando as aspas invertidas para interpolação de variáveis
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank'); // Abre o WhatsApp com o link gerado
  };
  



  return (
    <div className='main-container'>
      <div className='media-content'>
        <div className='info-secion'>
          <InfoSection />
        </div>
        <div className='img-forms'>
          <img src={meninaCelular} alt='menina no celular' className='form-image' />
        </div>
      </div>

      <div className="container">
        <h1>Multi Portabilidades</h1>
        <div className="titulo">
        <p> Olá {orderData.customer.first_name} {orderData.customer.last_name}, </p>
        </div>
        <div className="subtitle">
        <p>
          Detectamos mais de uma portabilidade no seu pedido:
        </p></div>

        
        <div className="order-list">
        {orderData.line_items?.filter(item => item.name.toLowerCase().includes('portabilidade')).map((item, index) => (
            <div key={index} className="order-item">
            <h3>{item.name}</h3>
            <p>Quantidade: <span className="highlight">{item.quantity}</span></p>
            <p>E-mail: {orderData.customer.email}</p>
            </div>
        ))}
        </div>

        <div className="Opcoes">
          <p className="text-center">Escolha como deseja proceder:</p>
          <button onClick={handleContactSupport} className="submit-button">
            <p>Tenho <span className="highlight">todos</span> os dados necessários e quero iniciar o envio </p>  
          </button>
          <button onClick={handleClick} className="submit-button">
            <p>Preciso de ajuda do suporte</p>
          </button>
        </div>

      </div>
    </div>
  );
};

export default GerenciarPortabilidade;
