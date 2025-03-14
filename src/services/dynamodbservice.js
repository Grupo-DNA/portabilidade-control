export const sendFormData = async (formData) => {
    try {
      const response = await fetch('https://n8n.dnasoftware.duckdns.org/webhook/calculo_portabilidade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  

      if (!response.ok) throw new Error('Erro ao enviar os dados para o DynamoDB.');
      
      const result = await response.json();

      console.log(result)

      return result;
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      throw error;
    }
  };
  