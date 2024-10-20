import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateFileName = (name) => {
    // Verifica se o nome do arquivo contém "(1)" ou padrões indesejados
    const invalidPattern = /\(\d+\)/;
    return invalidPattern.test(name);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const name = file.name;

    if (validateFileName(name)) {
      setErrorMessage(`Nome de arquivo inválido: ${name}. Por favor, renomeie o arquivo.`);
      setFileName('');
    } else {
      setFileName(name);
      setErrorMessage('');
      onDrop(acceptedFiles); // Chama o callback original passado como prop
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv'],
    },
    onDrop: handleDrop,
  });

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte o arquivo aqui...</p>
        ) : (
          <p>Arraste e solte um arquivo (.txt, .csv, .tsv) aqui, ou clique para selecionar</p>
        )}
      </div>
      {fileName && !errorMessage && <p>Arquivo selecionado: {fileName}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
