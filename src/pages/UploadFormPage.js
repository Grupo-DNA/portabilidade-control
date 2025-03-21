import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import FileUploader from '../components/FileUploader';
import meninaCelular from '../assets/novo.svg';
import { getPresignedUrl, uploadFileToS3 } from '../services/s3Service';
import { fetchOrderDetails } from '../services/shopifyService';
import { sendFormData } from '../services/dynamodbservice';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';
import './footer.css'
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
        sexo: data.sexoSelecionado,
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
      const file = acceptedFiles[0];
      const sanitizedFileName = file.name.replace(/\s+/g, "_"); // Substitui espaços por "_"
      
      // Criar um novo objeto File com o nome atualizado
      const renamedFile = new File([file], sanitizedFileName, { type: file.type });
  
      setFile(renamedFile);
    }
  };

  const nomesLista = ['Ancestry', 'Genera','Sommos','MeuDNA', '23andMe', '24Genetics', 
    'Transceptar', 'Complete Genomics', 'Outros'];

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
  {/* imagem com as infos */}
  <div className='media-content'>  
    <div className='img-forms'>
      <img src={meninaCelular} alt='menina no celular' className='form-image'/>
    </div>
  </div>
  {/* parte do formulário */}
  <div className="container">
    <h1>UPLOAD DO SEUS DADOS GENÉTICOS</h1>
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className='input-container input-ID' >
      <input
      type="text"
      id="idCompra"
      {...register("idCompra", { required: true })}
      placeholder=" "
      disabled={isValidOrder} 
      style={{
        borderColor: errors.idCompra ? "red" : isValidOrder ? "green" : "white",
        backgroundColor: isValidOrder ? "#f0f0f0" : "white", 
        cursor: isValidOrder ? "not-allowed" : "text" 
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
      {/* Seção de dados pessoais */}
      <div className="section">
        <h3>Dados Pessoais</h3>
        <div className='input-container'>
          <input type='text' id='nome' {...register('nome', { required: true })} placeholder=' ' />
          <label htmlFor='nome'>Nome</label>
          {errors.nome && <p className="error-message">NOME É OBRIGATÓRIO.</p>}
        </div>  

        <div className='input-container'>
          <input type='text' {...register('cpf', { required: true })} placeholder=' ' />
          <label htmlFor='cpf'>CPF</label>
          {errors.cpf && <p className="error-message">CPF É OBRIGATÓRIO.</p>}
        </div>

        <div className='input-container'>
          <input type='text' {...register('email', { required: true })} placeholder=' ' />
          <label htmlFor='email'>Email</label>
          {errors.email && <p className="error-message">EMAIL É OBRIGATÓRIO.</p>}
        </div>
      </div>

      {/* Seção de seleção de produto */}
      {orderData && (
        <div className="section order-selection">
          <h3>Selecione o Produto</h3>
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
          {errors.selectedProduct && <p className="error-message">Por favor, selecione um produto.</p>}
        </div>
      )}

      {/* Seção de seleções adicionais */}
      <div className="section">
        <div className='input-select'>
          <label>Empresa dos Dados Genéticos</label>
          <select {...register('nomeSelecionado', { required: true })}>
            {nomesLista.map((nome, index) => (
              <option key={index} value={nome}>{nome}</option>
            ))}
          </select>
          {errors.nomeSelecionado && <p className="error-message">Seleção de nome é obrigatória.</p>}
        </div>
        
        <div className='input-select'>
          <label>Sexo</label>
          <select {...register('sexoSelecionado', { required: true })}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
          {errors.sexoSelecionado && <p className="error-message">A seleção de sexo é obrigatória.</p>}
        </div>

        {/* Seção de termos e responsabilidade */}
        <div className="checkbox-container">
          <div>
            <input type="checkbox" id="legalResponsibility" {...register('legalResponsibility', { required: true })} />
            <label htmlFor="legalResponsibility">Sou o responsável legal por estes dados.</label>
            {errors.legalResponsibility && <p className="error-message">É necessário confirmar a responsabilidade legal.</p>}
          </div>

          <div>
            <input type="checkbox" id="termsAccepted" {...register('termsAccepted', { required: true })} />
            <label htmlFor="termsAccepted">Declaro que li e aceito integralmente as condições de uso.</label>
            {errors.termsAccepted && <p className="error-message">É necessário aceitar as condições de uso.</p>}
          </div>
        </div>
        
        {/* Upload de arquivo e link informativo */}
        <FileUploader onDrop={handleFileDrop} />

        <div className="download-link">
          <a href="" download="ID_purchase_guide.pdf">
            Onde achar os meus dados genéticos?
          </a>
        </div> 
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar'}
      </button>
    </>
  )}
</div>

    </form>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>(16) 98195-4580 | (16) 3415-6869</p>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/clubdodna_/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={25}/>
          </a>
        </div>
      </div>
    </footer>
  </div>
</div>

  );
};

export default UploadFormPage;