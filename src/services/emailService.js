export const sendEmailData = async (formData, name) => {
    try {
      const data = {
        destinatario: ["daniel.watanabe@dnaconsult.com.br", "dahirowata@gmail.com"],
        nome: name,
        pessoas: formData
      }
      const response = await fetch('https://hhiftxsof9.execute-api.us-east-1.amazonaws.com/dev/enviar_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error('Erro ao enviar o e-mail.');
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      throw error;
    }
  };
  