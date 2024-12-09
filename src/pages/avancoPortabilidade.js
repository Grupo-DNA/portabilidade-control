import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import meninaCelular from '../assets/meninaCelular.png';
import { useDropzone } from 'react-dropzone'; // Importando a biblioteca react-dropzone para drag-and-drop
import './avancoPortabilidade.css';
import { getPresignedUrl, uploadFileToS3 } from '../services/s3Service';
import { sendFormData } from '../services/dynamodbservice';
import { sendEmailData } from '../services/emailService';


const AvancoPortabilidade = () => {
  
  const location = useLocation();
  const { orderData, quantidadeDocumentos } = location.state || {}; // Recebe os dados do estado
  const navigate = useNavigate(); // Função de navegação do React Router
  
  // Cria o estado para os documentos, incluindo CPF, tipo de dado e sexo
  const [documentos, setDocumentos] = useState(
    Array.from({ length: quantidadeDocumentos }, () => ({ file: null, nome: '', cpf: '', email: '',tipoDado: '', sexo: '' })) // Inicializa os documentos com os novos campos
  );

  // Função para lidar com o upload do arquivo (independente por documento)
  const handleFileChange = (acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const newDocumentos = [...documentos];

    // Atualiza o arquivo no estado, mas não altera os outros campos
    newDocumentos[index].file = file;

    setDocumentos(newDocumentos);
  };

  // Função para lidar com o nome da pessoa (manual ou editável)
  const handleNomeChange = (e, index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].nome = e.target.value;
    setDocumentos(newDocumentos);
  };

  // Função para lidar com o CPF da pessoa
  const handleCpfChange = (e, index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].cpf = e.target.value;
    setDocumentos(newDocumentos);
  };

  // Função para lidar com o tipo de dado
  const handleTipoDadoChange = (e, index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].tipoDado = e.target.value;
    setDocumentos(newDocumentos);
  };

  // Função para lidar com o tipo de dado
  const handleEmailChange = (e, index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].email = e.target.value;
    setDocumentos(newDocumentos);
  };

  // Função para lidar com o sexo da pessoa
  const handleSexoChange = (e, index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].sexo = e.target.value;
    setDocumentos(newDocumentos);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Função de envio dos dados
  const handleSubmit = async () => {
    setIsSubmitting(true); // Desativa o botão e exibe a mensagem
    try {
      // Itera sobre cada documento
      for (let documento of documentos) {
        let isValid = true;
        const erros = {};

        // Validações dos campos obrigatórios
        if (!documento.nome) {
          erros.nome = "O nome é obrigatório";
          isValid = false;
        }
        if (!documento.cpf) {
          erros.cpf = "O CPF é obrigatório";
          isValid = false;
        }
        if (!documento.email) {
          erros.email = "O e-mail é obrigatório";
          isValid = false;
        }
        if (!documento.tipoDado) {
          erros.tipoDado = "O tipo de dado é obrigatório";
          isValid = false;
        }
        if (!documento.sexo) {
          erros.sexo = "O sexo é obrigatório";
          isValid = false;
        }
        if (!documento.file) {
          erros.file = "O arquivo é obrigatório";
          isValid = false;
        }

        // Atribuir os erros ao documento atual
        documento.erros = erros;

        if (!isValid) {
          // Exibir os erros encontrados
          const mensagensErro = Object.values(erros).join("\n");
          alert(`Por favor, preencha todos os campos obrigatórios:\n${mensagensErro}`);
          setIsSubmitting(false); // Reativa o botão
          return; // Interrompe o loop e o envio
        }

        if (documento.file) {
          try {
            const fileExtension = documento.file.name.split(".").pop().toLowerCase();
            let newFileName = documento.nome;

            if (fileExtension === "csv") {
              newFileName = `ID_${orderData.order_number}_${documento.nome}.csv`;
            } else if (fileExtension === "txt") {
              newFileName = `ID_${orderData.order_number}_${documento.nome}.txt`;
            }

            const renamedFile = new File([documento.file], newFileName, { type: documento.file.type });

            const presignedUrl = await getPresignedUrl(renamedFile);
            const s3FileUrl = await uploadFileToS3(presignedUrl, renamedFile);

            const formData = {
              email: documento.email,
              nome: documento.nome,
              cpf: documento.cpf,
              sexo: documento.sexo,
              produtoSelecionado: "Portabilidade - DNA COMPLETO",
              nomeSelecionado: documento.tipoDado,
              responsavelPelosDados: true,
              liOsTermosDeUso: true,
              s3FileUrl,
            };
            await sendFormData(formData, orderData);

            // Mudar o nome do documento
            documento.new_file = newFileName;
            console.log("Upload concluído com sucesso!", s3FileUrl);

            // Adicionar um pequeno atraso entre os envios
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 segundo
          } catch (error) {
            console.error("Erro ao fazer upload do arquivo:", error);
          }
        }
      }
      await sendEmailData(documentos, orderData.customer.first_name);
      console.log("Email enviado");
      navigate("/multiplaPort");
      console.log("Documentos e Nomes:", documentos);
    } catch (error) {
      console.error("Erro durante o envio:", error);
    } finally {
      setIsSubmitting(false); // Reativa o botão após a conclusão
    }
  };
    

  return (
    <div className="main-container">
      <div className="media-content">
        <div className="info-secion">
          <InfoSection />
        </div>
        <div className="img-forms">
          <img src={meninaCelular} alt="menina no celular" className="form-image" />
        </div>
      </div>

      <div className="container">
        <div className="upload-container">
          <h1>Envio de Documentos</h1>

          {/* Gerando os campos de upload com base na quantidade */}
          {documentos.map((documento, index) => (
            <div key={index} className="upload-item">
              <h3>Pessoa {index + 1}</h3>
              

              <DropzoneFileUpload 
                index={index} 
                handleFileChange={handleFileChange} 
                document={documento} 
              />

              <input
                type="text"
                placeholder={`Nome`}
                value={documento.nome}
                onChange={(e) => handleNomeChange(e, index)}
                className="name-input"
              />
              <input
                type="text"
                placeholder={`CPF`}
                value={documento.cpf}
                onChange={(e) => handleCpfChange(e, index)}
                className="name-input"
              />
              <input
                type="text"
                placeholder={`E-mail`}
                value={documento.email}
                onChange={(e) => handleEmailChange(e, index)}
                className="name-input"
              />
              <select
                value={documento.tipoDado}
                onChange={(e) => handleTipoDadoChange(e, index)}
                className="select-input"
              >
                <option value="">Selecione o tipo de dado</option>
                <option value="Ancestry">Ancestry</option>
                <option value="Genera">Genera</option>
                <option value="Sommos">Sommos</option>
                <option value="MeuDNA">MeuDNA</option>
                <option value="23AndMe">23AndMe</option>
                <option value="24Genetics">24Genetics</option>
                <option value="Transceptar">Transceptar</option>
                <option value="Complete Genomics">Complete Genomics</option>
                <option value="Outros">Outros</option>
              </select>
              <select
                value={documento.sexo}
                onChange={(e) => handleSexoChange(e, index)}
                className="select-input"
              >
                <option value="">Selecione o sexo</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
          ))}

          <button onClick={handleSubmit} className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Enviando documentos..." : "Enviar Documentos"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente separado para o campo de upload com drag and drop
const DropzoneFileUpload = ({ index, handleFileChange, document }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileChange(acceptedFiles, index),
    accept: '.csv, .txt ', // Tipos de arquivo aceitos
  });

  return (
    <div {...getRootProps()} className="file-upload-area">
      <input {...getInputProps()} />
      {document.file ? (
        <p>{document.file.name}</p>
      ) : (
        <p>Arraste e solte o arquivo ou clique para selecionar Coloque apenas .csv .txt</p>
      )}
    </div>
  );
};

export default AvancoPortabilidade;
