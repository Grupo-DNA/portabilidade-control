import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv'],
    },
    onDrop: async (acceptedFiles) => {
      console.log('Files:', acceptedFiles);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('https://sua-api-na-aws.com/upload', {
            method: 'POST',
            body: formData,
            headers: {
              // Adicione qualquer cabeçalho necessário, como autenticação, se for o caso.
              // Exemplo:
              // 'Authorization': 'Bearer seu-token'
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao enviar arquivo');
          }

          const result = await response.json();
          console.log('Upload bem-sucedido:', result);
        } catch (error) {
          console.error('Erro ao enviar arquivo:', error);
        }
      }
    },
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui...</p>
      ) : (
        <p>Arraste e solte um arquivo (.txt, .csv, .tsv) aqui, ou clique para selecionar</p>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #bb86fc',
  padding: '20px',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: '20px',
};

export default FileUploader;

