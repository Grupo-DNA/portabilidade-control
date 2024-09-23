import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FileUploader from '../components/FileUploader';

const UploadFormPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);

  const getPresignedUrl = async (file) => {
    try {
      const response = await fetch(`https://prgthrx905.execute-api.us-east-1.amazonaws.com/prod/upload-file?filename=${file.name}&filetype=${file.type}`);
      const { uploadUrl } = await response.json();
      return uploadUrl;
    } catch (error) {
      console.error('Erro ao obter URL pré-assinada:', error);
      throw new Error('Erro ao obter URL pré-assinada');
    }
  };

  const uploadFileToS3 = async (uploadUrl, file) => {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type, // Tipo de arquivo
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload para o S3');
      }

      return uploadUrl.split('?')[0]; // Retorna a URL pública do arquivo no S3 (sem parâmetros)
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw error;
    }
  };

  const sendFormData = async (formData) => {
    try {
      const response = await fetch('https://prgthrx905.execute-api.us-east-1.amazonaws.com/prod/dynamoDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: formData.cpf,
          email: formData.email,
          nomeProduto: formData.nomeSelecionado,
          s3fileUrl: formData.s3FileUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados para o DynamoDB.');
      }

      const result = await response.json();
      console.log('Sucesso:', result);

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const onSubmit = async (data) => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    try {
      const presignedUrl = await getPresignedUrl(file);
      const s3FileUrl = await uploadFileToS3(presignedUrl, file);

      // Envie os dados restantes para a API (nome, CPF, email, URL do arquivo no S3)
      const formData = {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        nomeSelecionado: data.nomeSelecionado,
        s3FileUrl: s3FileUrl, // URL pública do arquivo no S3
      };

      await sendFormData(formData);
      alert('Dados e upload bem-sucedidos!');

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar o formulário.');
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]); // Armazena o arquivo no estado
    }
  };

  const nomesLista = ['Pocket-DNA', 'Portabilidade-Completa', 'Trilhas Separadas','PharmaCLUB'];

  return (
    <div className="container">
      <h1>Formulário com Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input {...register('nome', { required: true })} />
          {errors.nome && <p>Nome é obrigatório.</p>}
        </div>

        <div>
          <label>CPF:</label>
          <input {...register('cpf', { required: true })} />
          {errors.cpf && <p>CPF é obrigatório.</p>}
        </div>

        <div>
          <label>Email:</label>
          <input {...register('email', { required: true })} />
          {errors.email && <p>Email inválido.</p>}
        </div>

        <div>
          <label>Selecione um Nome:</label>
          <select {...register('nomeSelecionado', { required: true })}>
            {nomesLista.map((nome, index) => (
              <option key={index} value={nome}>{nome}</option>
            ))}
          </select>
          {errors.nomeSelecionado && <p>Seleção de nome é obrigatória.</p>}
        </div>

        {/* Área de drag and drop */}
        <FileUploader onDrop={handleFileDrop} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default UploadFormPage;

