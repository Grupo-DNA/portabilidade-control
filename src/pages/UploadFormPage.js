import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import FileUploader from '../components/FileUploader';
import meninaCelular from '../assets/meninaCelular.png';
import { getPresignedUrl, uploadFileToS3 } from '../services/s3Service';
import { fetchOrderDetails } from '../services/shopifyService';
import { sendFormData } from '../services/dynamodbservice';

const UploadFormPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    try {
      const orderData = await fetchOrderDetails(data.idCompra);
      const presignedUrl = await getPresignedUrl(file);
      const s3FileUrl = await uploadFileToS3(presignedUrl, file);

      const formData = {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        nomeSelecionado: data.nomeSelecionado,
        s3FileUrl,
        orderDetails: orderData,
      };

      await sendFormData(formData);
      alert('Dados e upload bem-sucedidos!');
      navigate('/loading');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const nomesLista = ['Ancestry', 'Atlas', '23andMe','24Genetics', 'Complete Genomics'];

  return (
  <div className='main-container'>
    <div className="container">
      <h1>Upload dos seus dados genéticos</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>

        <div className='input-container'>
          <input type='text' id='idCompra' {...register('nome', { required: true })} placeholder=' ' />
          <label htmlFor='idCompra'>ID da compra</label>
          {errors.nome && <p>ID da compra é obrigatório.</p>}
        </div>
        
        <div className='input-container'>
          <input type='text' id='nome' {...register('nome', { required: true })} placeholder=' ' />
          <label htmlFor='nome'>Nome</label>
          {errors.nome && <p>Nome é obrigatório.</p>}
        </div>

        <div className='input-container'>
          <input  type='text' {...register('cpf', { required: true })} placeholder=' ' />
          <label htmlFor='cpf'>CPF</label>
          {errors.cpf && <p>CPF é obrigatório.</p>}
        </div>

        <div className='input-container'>
          <input type='text' {...register('email', { required: true })} placeholder=' ' />
          <label htmlFor='email'>Email</label>
          {errors.email && <p>Email inválido.</p>}
        </div>

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

        <button type="submit">Enviar</button>
      </form>
    </div>
    <img src={meninaCelular} alt='menina no celular' className='form-image'/>
    
  </div>
  
  );
};

export default UploadFormPage;
