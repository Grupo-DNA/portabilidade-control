import React from 'react';
import { useForm } from 'react-hook-form';
import FormField from '../components/FormField';
import FileUploader from '../components/FileUploader';
import { emailPattern } from '../utils/validators';

const UploadFormPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const handleFileDrop = (acceptedFiles) => {
    console.log('Files:', acceptedFiles);
  };

  return (
    <div className="container">
      <h1>DNA CLUB - portabilidade</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Nome"
          name="nome"
          register={register}
          required={true}
          errorMessage={errors.nome && 'Nome é obrigatório.'}
        />

        <FormField
          label="CPF"
          name="cpf"
          register={register}
          required={true}
          errorMessage={errors.cpf && 'CPF é obrigatório.'}
        />

        <FormField
          label="Email"
          name="email"
          register={register}
          required={true}
          pattern={emailPattern}
          errorMessage={errors.email && 'Email inválido.'}
        />

        <FileUploader onDrop={handleFileDrop} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default UploadFormPage;

