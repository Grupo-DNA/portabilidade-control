import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import FileUploader from '../components/FileUploader';
import meninaCelular from '../assets/meninaCelular.png';
import { getPresignedUrl, uploadFileToS3 } from '../services/s3Service';
import { fetchOrderDetails } from '../services/shopifyService';
import { sendFormData } from '../services/dynamodbservice';
import { useState } from 'react';
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
  
    if (data.email !== orderData.email) {
      alert('O e-mail fornecido não corresponde ao e-mail da compra.');
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
        sexo: data.sexo,
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

  const nomesLista = ['Ancestry', 'Genera','Sommos','MeuDNA', '23andMe', '24Genetics', 
    'Transceptar', 'Complete Genomics'];

  const idCompra = watch('idCompra');
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
  <div className='media-content'>   
    <div className='info-secion'>
      <InfoSection/>
    </div>
    <div className='img-forms'>
      <img src={meninaCelular} alt='menina no celular' className='form-image'/>
    </div>
  </div>
  <div className="container">
    <h1>Upload dos seus dados genéticos</h1>
    <form onSubmit={handleSubmit(handleSubmitForm)}>
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

      {/* Animação suave para expandir o formulário quando o ID é válido */}
      <div className={`expanded-form ${isValidOrder ? 'open' : ''}`}>
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

            {orderData && (
            <div className="order-selection">
              <h3>Selecione o produto que deseja:</h3>
              <div className="product-container">
                {orderData.line_items?.map((item, index) => (
                  <label key={index} className={`product-box ${item.name !== 'Portabilidade: DNA Club Completo' ? 'disabled' : ''}`}>
                    <input 
                      type="radio" 
                      name="selectedProduct" 
                      value={item.name} 
                      disabled={item.name !== 'Portabilidade: DNA Club Completo'} 
                      {...register('selectedProduct', { required: true })}
                    />
                    <div className="product-details">
                      <h4>{item.name}</h4>
                    </div>
                  </label>
                ))}
              </div>
              {errors.selectedProduct && <p>Por favor, selecione um produto.</p>}
            </div>
            )}

            <div className='input-select'>
              <label>Empresa dos dados genéticos</label>
              <select {...register('nomeSelecionado', { required: true })}>
                {nomesLista.map((nome, index) => (
                  <option key={index} value={nome}>{nome}</option>
                ))}
              </select>
              {errors.nomeSelecionado && <p>Seleção de nome é obrigatória.</p>}
            </div>
            <div className='input-select'>
              <label>Sexo</label>
              <select {...register('sexoSelecionado', { required: true })}>
                <option value="m">Masculino</option>
                <option value="f">Feminino</option>
              </select>
              {errors.sexoSelecionado && <p>A seleção de sexo é obrigatória.</p>}
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
            <div className="download-link">
              <a href="" download="ID_purchase_guide.pdf">
                Onde achar os meus dados genéticos?
              </a>
            </div>                  
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </>
        )}
      </div>
    </form>
  </div>
</div>

  );
};

export default UploadFormPage;