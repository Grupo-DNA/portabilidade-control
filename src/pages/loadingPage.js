import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dnaGIF from '../assets/dnaGIF.gif';
import './loadingpage.css'

const LoadingPage = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const [compatibilityValue, setCompatibilityValue] = useState(null); // Estado para armazenar o valor retornado
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://9smyqqiekf.execute-api.us-east-1.amazonaws.com/dev/dynamoDB?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Resultado da API:', result);
          console.log('compatbilidade', result.data)
          navigate('/ecosystem', { state: { compatibilityValue: result.data } });
        } else {
          console.error('Erro ao fazer a requisição à API:', response.statusText);
          navigate('/error');
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição à API:', error);
        navigate('/error'); // Redireciona para a página de erro em caso de exceção
      } finally {
        setLoading(false); // Desativa o estado de carregamento quando a requisição for concluída
      }
    };

    setTimeout(fetchData, 17000);
  }, [email, navigate]);

  return (
    <div className="loading-container">
      {loading ? (
        <>
          <img src={dnaGIF} alt="Loading" className="loading-gif" />
        </>
      ) : null}
    </div>
  );
};

export default LoadingPage;
