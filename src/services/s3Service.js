export const getPresignedUrl = async (file) => {
    try {
      const response = await fetch(`https://fi6f1hiuja.execute-api.us-east-1.amazonaws.com/dev/upload-file?filename=${file.name}&filetype=${file.type}`);
      const { uploadUrl } = await response.json();
      return uploadUrl;
    } catch (error) {
      console.error('Erro ao obter URL pré-assinada:', error);
      throw new Error('Erro ao obter URL pré-assinada');
    }
  };
  
  export const uploadFileToS3 = async (uploadUrl, file) => {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });
      if (!response.ok) throw new Error('Erro ao fazer upload para o S3');
      return uploadUrl.split('?')[0]; // Retorna a URL pública do arquivo no S3
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw error;
    }
  };
  