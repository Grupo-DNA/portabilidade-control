import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import FileUploader from '../components/FileUploader';
import meninaCelular from '../assets/meninaCelular.png';
import { getPresignedUrl, uploadFileToS3 } from '../services/s3Service';
import { fetchOrderDetails } from '../services/shopifyService';
import { sendFormData } from '../services/dynamodbservice';
import { useState, useEffect } from 'react';
import InfoSection from '../components/infoSection';
import './forms.css'
                        
const UploadFormPage = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, watch } = useForm();
  const [file, setFile] = useState(null);
  const [isValidOrder, setIsValidOrder] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Para o estado de envio do formulário
  const [isValidating, setIsValidating] = useState(false); // Para o estado de validação do ID da compra
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    setIsLoading(true); // Ativa o estado de carregamento para o botão "Enviar"

    try {
      
      const presignedUrl = await getPresignedUrl(file);
      const s3FileUrl = await uploadFileToS3(presignedUrl, file);

      // Prepara os dados do formulário
      const formData = {
        email: data.email,
        nome: data.nome,
        cpf: data.cpf,
        produtoSelecionado: data.selectedProduct,
        nomeSelecionado: data.nomeSelecionado,
        responsavelPelosDados: data.legalResponsibility,
        liOsTermosDeUso: data.termsAccepted,
        s3FileUrl,
      };
      await sendFormData(formData);
      navigate('/loading', { state: { email: formData.email } });      
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
      navigate('/error'); // Redireciona para a página de erro
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const nomesLista = ['Ancestry', 'Atlas', '23andMe', '24Genetics', 'Complete Genomics'];
  const idCompra = watch('idCompra');

  // Função para validar o ID da compra
  const validateOrderId = async () => {
    if (!idCompra) {
      setError('idCompra', { type: 'manual', message: 'ID da compra é obrigatório.' });
      return;
    }

    setIsValidating(true); // Ativa o estado de carregamento para o botão "Validar ID da compra"

    try {
      const orderData = await fetchOrderDetails(idCompra);
      if (orderData) {
        setIsValidOrder(true);
        setOrderData(orderData);
        clearErrors('idCompra'); // Limpa qualquer erro se o pedido for válido
      } else {
        setIsValidOrder(false);
        setError('idCompra', { type: 'manual', message: 'Pedido não encontrado.' });
      }
    } catch (error) {
      setIsValidOrder(false);
      setError('idCompra', { type: 'manual', message: 'Erro ao validar o ID da compra.' });
    } finally {
      setIsValidating(false); // Desativa o estado de carregamento para o botão "Validar ID da compra"
    }
  };

  return (
    <div className='main-container'>
      <InfoSection/>
      <div className="container">
        <h1>Upload dos seus dados genéticos</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>

          {/* Campo do ID da compra */}
          <div className='input-container'>
            <input 
              type='text' 
              id='idCompra' 
              {...register('idCompra', { required: true })} 
              placeholder=' ' 
              style={{
                borderColor: errors.idCompra ? 'red' : isValidOrder ? 'green' : 'black'
              }}
            />
            <label htmlFor='idCompra'>ID da compra</label>
            {errors.idCompra && <p>{errors.idCompra.message || 'ID da compra é obrigatório.'}</p>}
          </div>

          {/* Botão para validar o ID da compra */}
          {!isValidOrder && (
            <button type="button" onClick={validateOrderId} disabled={isValidating}>
              {isValidating ? 'Validando...' : 'Validar ID da compra'}
            </button>
          )}

          {/* Mostrar o restante do formulário somente se o ID da compra for válido */}
          {isValidOrder && (
            <>
              <div className='input-container'>
                <input type='text' id='nome' {...register('nome', { required: true })} placeholder=' ' />
                <label htmlFor='nome'>Nome</label>
                {errors.nome && <p>Nome é obrigatório.</p>}
              </div>

              <div className='input-container'>
                <input type='text' {...register('cpf', { required: true })} placeholder=' ' />
                <label htmlFor='cpf'>CPF</label>
                {errors.cpf && <p>CPF é obrigatório.</p>}
              </div>

              <div className='input-container'>
                <input type='text' {...register('email', { required: true })} placeholder=' ' />
                <label htmlFor='email'>Email</label>
                {errors.email && <p>Email inválido.</p>}
              </div>

              {isValidOrder && orderData && (
                <div className="order-selection">
                  <h3>Selecione o produto que deseja:</h3>
                  <div className="product-container">
                    {orderData.line_items?.map((item, index) => (
                      <label key={index} className="product-box">
                        <input 
                          type="radio" 
                          name="selectedProduct" 
                          value={item.name} 
                          {...register('selectedProduct', { required: true })}
                        />
                        <div className="product-details">
                          <h4>{item.name}</h4>
                          <p>Quantidade: {item.quantity}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.selectedProduct && <p>Por favor, selecione um produto.</p>}
                </div>
              )}

              <div>
                <label>Empresa dos dados genéticos</label>
                <select {...register('nomeSelecionado', { required: true })}>
                  {nomesLista.map((nome, index) => (
                    <option key={index} value={nome}>{nome}</option>
                  ))}
                </select>
                {errors.nomeSelecionado && <p>Seleção de nome é obrigatória.</p>}
              </div>
              <div className="info-links">
                  <p>
                    Saiba <a href="/onde-encontrar" target="_blank" rel="noopener noreferrer">onde encontrar seus dados brutos</a>
                  </p>
                  <p>
                    Saiba mais sobre as <a href="/condicoes-de-uso" target="_blank" rel="noopener noreferrer">Condições de Uso</a>
                  </p>
                  <p>
                    Saiba <a href="/onde-encontrar" target="_blank" rel="noopener noreferrer">onde encontrar o ID da compra</a>
                  </p>
                </div>

                <div className="checkbox-container">
                  <div>
                    <input type="checkbox" id="legalResponsibility" {...register('legalResponsibility', { required: true })} />
                    <label htmlFor="legalResponsibility">Sou o responsável legal por estes dados.</label>
                    {errors.legalResponsibility && <p>É necessário confirmar a responsabilidade legal.</p>}
                  </div>

                  <div>
                    <input type="checkbox" id="termsAccepted" {...register('termsAccepted', { required: true })} />
                    <label htmlFor="termsAccepted">Declaro que li e aceito integralmente as condições de uso.</label>
                    {errors.termsAccepted && <p>É necessário aceitar as condições de uso.</p>}
                  </div>
                </div>

              <FileUploader onDrop={handleFileDrop} />

              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </>
          )}
        </form>
        
      </div>
      <img src={meninaCelular} alt='menina no celular' className='form-image'/>
    </div>
  );
};

export default UploadFormPage;