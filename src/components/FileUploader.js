import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv'],
    },
    onDrop,
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
  border: '2px dashed #007bff',
  padding: '20px',
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: '20px',
};

export default FileUploader;

